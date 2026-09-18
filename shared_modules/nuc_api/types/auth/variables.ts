export type AuthFormSetFields<T> = (value: T | ((prev: T) => T)) => void
