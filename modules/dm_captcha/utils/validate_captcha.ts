export async function validateCaptcha(tokenValue: string) {
  return (await $fetch('/api/captcha/validate', {
    method: 'POST',
    body: { token: tokenValue },
  })) as { success: boolean }
}
