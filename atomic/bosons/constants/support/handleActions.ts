import { ObjectType } from '@/types'

import { ActionInterface, OpenDialogFunctionType } from 'atomic/bosons/types'

export const handleActions = (
    openDialog: OpenDialogFunctionType
): ActionInterface[] => {
    return [
        {
            icon: 'pi pi-eye',
            click: (data: ObjectType) => openDialog('show', data),
        },
        {
            icon: 'pi pi-pencil',
            click: (data: ObjectType) => openDialog('edit', data),
        },
        {
            icon: 'pi pi-trash',
            click: (data: ObjectType) => openDialog('delete', data),
        },
    ]
}
