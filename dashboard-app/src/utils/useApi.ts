const API_URL = import.meta.env.VITE_API_URL

async function useApi(endpoint: RequestInfo | URL, options?: RequestInit) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
  })
  const responseJson = await response.json()
  if (response.ok) {
    return responseJson
  } else {
    throw responseJson
  }
}

export default useApi
