import React, { useEffect } from 'react';
import CommonTextField from './common/TextField';
import CommonButton from './common/Button';
import authStore from '../stores/authStore';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const store = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.loggedIn) {
      navigate('/notes');
    }
  }, [store.loggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    store.login();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} autoComplete="off">
      <CommonTextField
        label="Email"
        type="email"
        name="email"
        value={store.loginForm.email}
        onChange={store.updateLoginForm}
        required
      />
      <CommonTextField
        label="Password"
        type="password"
        name="password"
        value={store.loginForm.password}
        onChange={store.updateLoginForm}
        required
      />
      <CommonButton type="submit" fullWidth>Login</CommonButton>
    </Box>
  );
};

export default LoginForm;
