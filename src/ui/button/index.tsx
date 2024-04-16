import React, { ButtonHTMLAttributes } from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';

interface ReusableButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'variant'> {
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  title?: string; // Add title attribute
}

export const Button: React.FC<ReusableButtonProps> = ({
  color = 'primary',
  variant = 'contained',
  title, // Destructure title from props
  children,
  ...rest
}) => {
  return (
    <MuiButton
      color={color}
      variant={variant}
      title={title} // Pass title to the button component
      {...rest}
    >
      {children}
    </MuiButton>
  );
};
