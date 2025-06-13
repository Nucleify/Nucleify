import { JSX } from "react";

import Avatar from '@mui/material/Avatar';

import { AdAvatarInterface } from "./types";

export default function AdAvatar({
  className = "",
  sx,
  ...rest
}: AdAvatarInterface): JSX.Element {
  return (
    <Avatar
      className={`ad-avatar ${className}`}
      sx={sx}
      {...rest}
    />
  );
}