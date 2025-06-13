import { JSX } from "react";

import { BottomNavigationAction } from "@mui/material";

import { AdBottomNavigationActionInterface } from "./types";

export default function AdBottomNavigationAction({
    className = "",
    sx,
    ...rest
    }: AdBottomNavigationActionInterface): JSX.Element {
    return (
        <BottomNavigationAction
        className={`ad-bottom-navigation-action ${className}`}
        sx={sx}
        {...rest}
        />
    );
    }