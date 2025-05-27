import { SxProps, Theme } from '@mui/material';

export interface AdCardMediaProps {
    children?: React.ReactNode;
    className?: string;
    component?: React.ElementType;
    image?: string;
    srcSet?: string;
    sx?: SxProps<Theme>;
};