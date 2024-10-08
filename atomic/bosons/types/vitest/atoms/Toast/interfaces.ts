export interface MockUseToastInterface {
    add: (message: string) => void
    success: (message: string) => void
    error: (message: string) => void
    clear: () => void
}
