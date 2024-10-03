export type DeleteEntityRequestFunctionType = (
    id: number,
    getData: () => void,
    close: () => void
) => Promise<void>
