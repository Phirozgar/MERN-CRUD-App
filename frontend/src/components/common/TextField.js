import React from 'react';
import TextField from '@mui/material/TextField';

const CommonTextField = ({ label, ...props }) => (
  <TextField label={label} variant="outlined" fullWidth margin="normal" {...props} />
);

export default CommonTextField; 