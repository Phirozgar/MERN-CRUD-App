import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import authStore from '../../stores/authStore';
import { Link } from 'react-router-dom';

const Navbar = ({ title }) => {
  const store = authStore();
  const { loggedIn, userEmail, logout } = store;

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Box>
          {loggedIn ? (
            <ButtonGroup variant="text" color="inherit">
              <Button disabled>{userEmail}</Button>
              <Button onClick={logout}>Logout</Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup variant="text" color="inherit">
              <Button component={Link} to="/login">Login</Button>
              <Button component={Link} to="/signup">Signup</Button>
            </ButtonGroup>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 