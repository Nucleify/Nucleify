import type { AutocompleteRenderGroupParams } from '@mui/material/Autocomplete'
import type { PopperProps } from '@mui/material/Popper'
import type { HTMLAttributes, JSXElementConstructor } from 'react'

import type { SxProps, Theme } from '@mui/material'

export interface AdAutocompleteInterface<
  Option = unknown,
  Value = Option,
  State = object,
> {
  options: Option[]
  renderInput: (params: object) => React.ReactNode
  autoComplete?: boolean
  autoHighlight?: boolean
  autoSelect?: boolean
  blurOnSelect?: 'mouse' | 'touch' | boolean
  ChipProps?: object
  className?: string
  clearIcon?: React.ReactNode
  clearOnBlur?: boolean
  clearOnEscape?: boolean
  clearText?: string
  closeText?: string
  componentsProps?: {
    clearIndicator?: object
    paper?: object
    popper?: object
    popupIndicator?: object
  }
  defaultValue?: Value
  disableClearable?: boolean
  disableCloseOnSelect?: boolean
  disabled?: boolean
  disabledItemsFocusable?: boolean
  disableListWrap?: boolean
  disablePortal?: boolean
  filterOptions?: (options: Option[], state: State) => Option[]
  filterSelectedOptions?: boolean
  forcePopupIcon?: 'auto' | boolean
  freeSolo?: boolean
  fullWidth?: boolean
  getLimitTagsText?: (more: number) => React.ReactNode
  getOptionDisabled?: (option: Option) => boolean
  getOptionKey?: (option: Option) => string | number
  getOptionLabel?: (option: Option) => string
  groupBy?: (option: Option) => string
  handleHomeEndKeys?: boolean
  id?: string
  includeInputInList?: boolean
  inputValue?: string
  isOptionEqualToValue?: (option: Option, value: Value) => boolean
  limitTags?: number
  ListboxComponent?: JSXElementConstructor<HTMLAttributes<HTMLElement>>
  ListboxProps?: object
  loading?: boolean
  loadingText?: React.ReactNode
  multiple?: boolean
  noOptionsText?: React.ReactNode
  onChange?: (
    event: React.SyntheticEvent,
    value: Value,
    reason: string,
    details?: object
  ) => void
  onClose?: (event: React.ChangeEvent<unknown>, reason: string) => void
  onHighlightChange?: (
    event: React.SyntheticEvent,
    option: Option | null,
    reason: string
  ) => void
  onInputChange?: (
    event: React.SyntheticEvent,
    value: string,
    reason: string
  ) => void
  onOpen?: (event: React.SyntheticEvent) => void
  open?: boolean
  openOnFocus?: boolean
  openText?: string
  PaperComponent?: JSXElementConstructor<HTMLAttributes<HTMLElement>>
  PopperComponent?: JSXElementConstructor<PopperProps>
  popupIcon?: React.ReactNode
  readOnly?: boolean
  renderGroup?: (params: AutocompleteRenderGroupParams) => React.ReactNode
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: Option,
    state: State
  ) => React.ReactNode
  renderTags?: (
    value: Option[],
    getTagProps: (params: { index: number }) => object
  ) => React.ReactNode
  renderValue?: (value: Value) => React.ReactNode
  selectOnFocus?: boolean
  size?: 'small' | 'medium'
  slotProps?: {
    chip?: object
    clearIndicator?: object
    listbox?: object
    paper?: object
    popper?: object
    popupIndicator?: object
  }
  slots?: {
    listbox?: JSXElementConstructor<HTMLAttributes<HTMLElement>>
    paper?: JSXElementConstructor<HTMLAttributes<HTMLElement>>
    popper?: JSXElementConstructor<PopperProps>
  }
  sx?: SxProps<Theme>
  value?: Value
}
