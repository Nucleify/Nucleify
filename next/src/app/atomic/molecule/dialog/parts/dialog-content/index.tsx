import { JSX } from "react";

import { DialogContent } from "@mui/material";

import { AdDialogContentInterface } from "./types";

export default function AdDialogContent({
    children,
    className = "",
    sx,
    ...rest
}: AdDialogContentInterface): JSX.Element {
    return (
        <DialogContent className={`ad-dialog-content ${className}`} sx={sx} {...rest}>
            {children}
        </DialogContent>
    );
}