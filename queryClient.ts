// client/src/lib/queryClient.ts
import { QueryClient, QueryFunction } from "@tanstack/react-query";

/**
 * Base URL:
 * - Nếu dùng Vite proxy, để trống
 * - Nếu gọi trực tiếp backend, đặt VITE_API_URL=http://localhost:5000
 */
const BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "";

/* --------------------------------------------------
   THROW HELPER
-------------------------------------------------- */
async function throwIfResNotOk(res: Response) {
  if (res.ok) return;

  const text = await res.text();
  try {
    const json = JSON.parse(text);
    const msg = json?.message || json?.error || JSON.stringify(json);
    throw new Error(`${res.status}: ${msg}`);
  } catch {
    const msg = text || res.statusText;
    throw new Error(`${res.status}: ${msg}`);
  }
}

/* --------------------------------------------------
   UNIFIED API REQUEST  (DÙNG CHO MUTATION/POST)
-------------------------------------------------- */
export async function apiRequest(
  method: string,
  path: string,
  body?: any
) {
  const fullUrl =
    path.startsWith("http://") || path.startsWith("https://")
      ? path
      : `${BASE}${path}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(fullUrl, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

/* --------------------------------------------------
   API JSON WRAPPER
-------------------------------------------------- */
export async function apiJSON<T = any>(
  method: string,
  url: string,
  data?: unknown
): Promise<T> {
  const res = await apiRequest(method, url, data);
  return (await res.json()) as T;
}

/* --------------------------------------------------
   QUERY FUNCTION (GET requests)
-------------------------------------------------- */
type UnauthorizedBehavior = "returnNull" | "throw";

export function getQueryFn<T>(options: {
  on401: UnauthorizedBehavior;
}): QueryFunction<T> {
  const { on401 } = options;

  return async ({ queryKey }) => {
    const joined = Array.isArray(queryKey)
      ? queryKey.join("/")
      : String(queryKey);

    const url =
      joined.startsWith("http://") || joined.startsWith("https://")
        ? joined
        : `${BASE}${joined}`;

    const res = await fetch(url, {
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (on401 === "returnNull" && res.status === 401) {
      return null as unknown as T;
    }

    await throwIfResNotOk(res);
    return (await res.json()) as T;
  };
}

/* --------------------------------------------------
   QUERY CLIENT
-------------------------------------------------- */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
