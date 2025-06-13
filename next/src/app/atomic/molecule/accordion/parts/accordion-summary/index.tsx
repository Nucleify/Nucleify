import { JSX } from "react";

import { AccordionSummary } from "@mui/material";

import { AdAccordionSummaryInterface } from "./types";

export default function AdAccordionSummary({
    children,
    className = "",
    sx,
    ...rest
}: AdAccordionSummaryInterface): JSX.Element {
  return (
    <AccordionSummary className={`ad-accordion-summary ${className}`} sx={sx} {...rest}>
      {children}
    </AccordionSummary>
  );
}