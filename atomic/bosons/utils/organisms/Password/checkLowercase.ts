export function checkLowercase(password: string | undefined | null): boolean {
    if (password === undefined || null) return

    return /[a-z]/.test(password)
}
