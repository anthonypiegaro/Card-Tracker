import redis from "./redis"

const TOKEN_REDIS_KEY = "ebay_access_token"

export async function getEbayAccessToken(): Promise<string> {
  const cachedToken = await redis.get(TOKEN_REDIS_KEY)

  if (cachedToken) {
    return cachedToken
  }

  const clientId = process.env.EBAY_APP_ID!
  const clientSecret = process.env.EBAY_CERT_ID!
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const response = await fetch(process.env.EBAY_OAUTH_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch token: ${response.statusText}`)
  }

  const data = await response.json()
  const { access_token, expires_in } = data

  await redis.set(TOKEN_REDIS_KEY, access_token, "EX", expires_in - 60)

  return access_token
}