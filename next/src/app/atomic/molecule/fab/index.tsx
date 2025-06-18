import { JSX } from "react";

import Fab from '@mui/material/Fab';

import { AdFabInterface } from './types';

export default function AdFab({
    children,
    className = '',
    sx,
    ...rest
}: AdFabInterface): JSX.Element {
    return (
        <Fab className={`ad-fab ${className}`} sx={sx} {...rest}>
            {children}
        </Fab>
    );
}