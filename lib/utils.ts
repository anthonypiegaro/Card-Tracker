import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type MockApiOptions<T> = {
  /** Time in ms to simulate latency (default: 1000) */
  delay?: number;
  /** Whether the call should succeed or fail */
  shouldSucceed?: boolean;
  /** Data to resolve with on success */
  responseData?: T;
  /** Error message or object to reject with */
  errorData?: any;
}

export async function mockApiCall<T>({
  delay = 1000,
  shouldSucceed = true,
  responseData,
  errorData = { message: "Something went wrong" },
}: MockApiOptions<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        console.log(`[mockApiCall] ✅ Success after ${delay}ms`);
        resolve(responseData as T);
      } else {
        console.warn(`[mockApiCall] ❌ Error after ${delay}ms`);
        reject(errorData);
      }
    }, delay)
  })
}
