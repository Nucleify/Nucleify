export function resolveApiHandleData<T>(response: unknown): T {
  const data =
    response &&
    typeof response === 'object' &&
    'data' in response &&
    !Array.isArray(response)
      ? (response as { data: unknown }).data
      : response

  if (Array.isArray(data)) {
    return data.filter(
      (item): item is NonNullable<typeof item> => item != null
    ) as T
  }

  return data as T
}
