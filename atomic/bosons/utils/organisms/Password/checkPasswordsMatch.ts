export function checkPasswordsMatch(
    password: string | undefined | null,
    password_confirmation: string | undefined | null
): boolean {
    if (password === undefined || null) return

    return password === password_confirmation
}
