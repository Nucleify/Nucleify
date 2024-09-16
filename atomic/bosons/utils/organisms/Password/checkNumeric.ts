export function checkNumeric(password: string | undefined | null): boolean {
    if (password === undefined || null) return

    return /\d/.test(password)
}
