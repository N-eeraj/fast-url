const API_URL = import.meta.env.VITE_API_URL

type ApiOptions = Omit<RequestInit, 'body'> & {
  body?: Record<string, unknown> | string | null
  query?: string | Record<string, string> | string[][] | URLSearchParams
}

async function api<T = unknown>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { body, query, headers, ...rest } = options

  const isObjectBody =
    body !== null &&
    typeof body === 'object' &&
    !(body instanceof FormData)

  const finalBody =
    body == null
      ? undefined
      : isObjectBody
      ? JSON.stringify(body)
      : body

  const baseUrl = `${API_URL}${endpoint}`
  const url = new URL(baseUrl)
  if (query) {
    url.search = new URLSearchParams(query).toString()
  }

  const response = await fetch(url, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: finalBody,
  })

  const contentType = response.headers.get('content-type')

  const data =
    contentType?.includes('application/json')
      ? await response.json().catch(() => null)
      : await response.text().catch(() => null)

  if (!response.ok) {
    throw {
      status: response.status,
      ...data,
    }
  }

  return data as T
}

export default api
