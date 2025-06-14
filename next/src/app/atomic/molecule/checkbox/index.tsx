import { JSX } from "react";

import { Checkbox } from "@mui/material";

import { AdCheckboxInterface } from "./types";

export default function AdCheckbox({
    className = "",
    sx,
    ...rest
}: AdCheckboxInterface): JSX.Element {
    return (
        <Checkbox
            className={`ad-checkbox ${className}`}
            sx={sx}
            {...rest}
        />
    );
}