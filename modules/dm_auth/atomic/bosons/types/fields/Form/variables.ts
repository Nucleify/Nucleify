import type {
  InputInterface,
  LoginFieldsInterface,
  RegisterFieldsInterface,
} from 'atomic'

export type LoginFieldKey = keyof LoginFieldsInterface
export type RegisterFieldKey = keyof RegisterFieldsInterface

export type LoginInputInterface = InputInterface<LoginFieldKey>
export type RegisterInputInterface = InputInterface<RegisterFieldKey>
