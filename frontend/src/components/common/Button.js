import React from 'react';
import Button from '@mui/material/Button';

const CommonButton = ({ children, variant = 'contained', color = 'primary', ...props }) => (
  <Button variant={variant} color={color} {...props}>
    {children}
  </Button>
);

export default CommonButton; 