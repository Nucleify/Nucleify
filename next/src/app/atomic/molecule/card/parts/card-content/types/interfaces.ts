import { SxProps, Theme } from '@mui/material';

export interface AdCardContentProps {
  children: React.ReactNode;
  className?: string;
  component?: React.ElementType;
  sx?: SxProps<Theme>;
};