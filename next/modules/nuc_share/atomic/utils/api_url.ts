export function apiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? ''
}
