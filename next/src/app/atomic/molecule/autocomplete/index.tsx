import { JSX } from "react";

import Autocomplete from "@mui/material/Autocomplete";

import { AdAutocompleteInterface } from "./types";

export default function AdAutocomplete({
  className = "",
  sx,
  ...rest
}: AdAutocompleteInterface): JSX.Element {
  return (
    <Autocomplete
      className={`ad-autocomplete ${className}`}
      sx={sx}
      {...rest}
    />
  );
}