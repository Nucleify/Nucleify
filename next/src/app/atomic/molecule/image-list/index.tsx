import { JSX } from "react";

import ImageList from '@mui/material/ImageList';

import { AdImageListInterface } from './types';

export default function AdImageList({
    children,
    className,
    sx,
    ...rest
}: AdImageListInterface): JSX.Element {
    return (
        <ImageList className={`ad-image-list ${className}`} sx={sx} {...rest}>
            {children}
        </ImageList>
    );
}