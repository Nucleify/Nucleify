export const apiUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
}

export const appUrl = () => {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
}

export const appEnv = () => {
  return process.env.NEXT_PUBLIC_APP_ENV || 'development'
}
