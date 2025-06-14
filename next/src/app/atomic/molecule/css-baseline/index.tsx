import { JSX } from "react";

import { CssBaseline } from "@mui/material";

import { AdCssBaselineInterface } from "./types";

export default function AdCssBaseline(rest: AdCssBaselineInterface): JSX.Element {
    return <CssBaseline {...rest} />;
}