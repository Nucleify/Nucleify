export function checkIsEmpty(password: string | undefined | null): boolean {
    return !password || password === ''
}
