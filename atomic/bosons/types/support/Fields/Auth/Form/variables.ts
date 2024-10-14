import {
    InputInterface,
    LoginFieldsInterface,
    RegisterFieldsInterface,
} from 'atomic/bosons/types'

export type LoginFieldKey = keyof LoginFieldsInterface
export type RegisterFieldKey = keyof RegisterFieldsInterface

export type LoginInputInterface = InputInterface<LoginFieldKey>
export type RegisterInputInterface = InputInterface<RegisterFieldKey>
