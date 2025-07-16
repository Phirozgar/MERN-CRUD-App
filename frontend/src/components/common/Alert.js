import React from 'react';
import MuiAlert from '@mui/material/Alert';

const Alert = ({ severity = 'info', children, ...props }) => (
  <MuiAlert severity={severity} sx={{ mb: 2 }} {...props}>
    {children}
  </MuiAlert>
);

export default Alert; 