import React, { ChangeEvent } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface ReusableInputProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
  label: string;
  value?: string; // Make value prop optional
  onChange: (event: ChangeEvent<HTMLInputElement>) => void; // Adjust onChange handler type
}

export const Input: React.FC<ReusableInputProps> = ({
  label,
  value = '', // Provide a default value for value prop
  onChange,
  ...rest
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

