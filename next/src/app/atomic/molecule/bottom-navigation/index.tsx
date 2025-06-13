import { JSX } from "react";

import BottomNavigation from "@mui/material/BottomNavigation";

import { AdBottomNavigationInterface } from "./types";

export default function AdBottomNavigation({
    children,
    className = "",
    sx,
    ...rest
}: AdBottomNavigationInterface): JSX.Element {
  return (
    <BottomNavigation className={`ad-bottom-navigation ${className}`} sx={sx} {...rest}>
      {children}
    </BottomNavigation>
  );
}