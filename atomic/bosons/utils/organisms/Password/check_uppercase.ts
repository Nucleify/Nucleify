export function checkUppercase(password: string | undefined | null): boolean {
    if (password === undefined || null) return

    return /[A-Z]/.test(password)
}
