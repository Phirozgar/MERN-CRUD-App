import React, { useEffect, useRef } from 'react';
import CommonTextField from './common/TextField';
import CommonButton from './common/Button';
import authStore from '../stores/authStore';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const store = authStore();
  const navigate = useNavigate();
  const prevEmail = useRef(store.signupForm.email);

  useEffect(() => {
    // If the email field was filled and is now reset, assume signup succeeded
    if (prevEmail.current && !store.signupForm.email) {
      navigate('/login');
    }
    prevEmail.current = store.signupForm.email;
  }, [store.signupForm.email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    store.signup();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} autoComplete="off">
      <CommonTextField
        label="Email"
        type="email"
        name="email"
        value={store.signupForm.email}
        onChange={store.updateSignupForm}
        required
      />
      <CommonTextField
        label="Password"
        type="password"
        name="password"
        value={store.signupForm.password}
        onChange={store.updateSignupForm}
        required
      />
      <CommonButton type="submit" fullWidth>Sign Up</CommonButton>
    </Box>
  );
};

export default SignupForm;
