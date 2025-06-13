import { JSXElementConstructor, HTMLAttributes } from "react";

import { SxProps, Theme } from "@mui/material";
import { PopperProps } from "@mui/material/Popper";
import { AutocompleteRenderGroupParams } from "@mui/material/Autocomplete";

export interface AdAutocompleteInterface {
    options: any[];
    renderInput: (params: any) => React.ReactNode;
    autoComplete?: boolean;
    autoHighlight?: boolean;
    autoSelect?: boolean;
    blurOnSelect?: 'mouse' | 'touch' | boolean;
    ChipProps?: object;
    className?: string;
    clearIcon?: React.ReactNode;
    clearOnBlur?: boolean;
    clearOnEscape?: boolean;
    clearText?: string;
    closeText?: string;
    componentsProps?: {
        clearIndicator?: object;
        paper?: object;
        popper?: object;
        popupIndicator?: object;
    };
    defaultValue?: any;
    disableClearable?: boolean;
    disableCloseOnSelect?: boolean;
    disabled?: boolean;
    disabledItemsFocusable?: boolean;
    disableListWrap?: boolean;
    disablePortal?: boolean;
    filterOptions?: (options: any[], state: object) => any[];
    filterSelectedOptions?: boolean;
    forcePopupIcon?: 'auto' | boolean;
    freeSolo?: boolean;
    fullWidth?: boolean;
    getLimitTagsText?: (more: number) => React.ReactNode;
    getOptionDisabled?: (option: any) => boolean;
    getOptionKey?: (option: any) => string | number;
    getOptionLabel?: (option: any) => string;
    groupBy?: (option: any) => string;
    handleHomeEndKeys?: boolean;
    id?: string;
    includeInputInList?: boolean;
    inputValue?: string;
    isOptionEqualToValue?: (option: any, value: any) => boolean;
    limitTags?: number;
    ListboxComponent?: JSXElementConstructor<HTMLAttributes<HTMLElement>>;
    ListboxProps?: object;
    loading?: boolean;
    loadingText?: React.ReactNode;
    multiple?: boolean;
    noOptionsText?: React.ReactNode;
    onChange?: (
        event: React.SyntheticEvent,
        value: any,
        reason: string,
        details?: any
    ) => void;
    onClose?: (event: React.ChangeEvent<{}>, reason: string) => void;
    onHighlightChange?: (
        event: React.SyntheticEvent,
        option: any | null,
        reason: string
    ) => void;
    onInputChange?: (
        event: React.SyntheticEvent,
        value: string,
        reason: string
    ) => void;
    onOpen?: (event: React.SyntheticEvent) => void;
    open?: boolean;
    openOnFocus?: boolean;
    openText?: string;
    PaperComponent?: JSXElementConstructor<HTMLAttributes<HTMLElement>>;
    PopperComponent?: JSXElementConstructor<PopperProps>;
    popupIcon?: React.ReactNode;
    readOnly?: boolean;
    renderGroup?: (params: AutocompleteRenderGroupParams) => React.ReactNode;
    renderOption?: (
        props: React.HTMLAttributes<HTMLLIElement>,
        option: any,
        state: object
    ) => React.ReactNode;
    renderTags?: (
        value: any[],
        getTagProps: (params: { index: number }) => object
    ) => React.ReactNode;
    renderValue?: (value: any) => React.ReactNode;
    selectOnFocus?: boolean;
    size?: 'small' | 'medium';
    slotProps?: {
        chip?: object;
        clearIndicator?: object;
        listbox?: object;
        paper?: object;
        popper?: object;
        popupIndicator?: object;
    };
    slots?: {
        listbox?: JSXElementConstructor<HTMLAttributes<HTMLElement>>;
        paper?: JSXElementConstructor<HTMLAttributes<HTMLElement>>;
        popper?: JSXElementConstructor<PopperProps>;
    };
    sx?: SxProps<Theme>;
    value?: any;
}