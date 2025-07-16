import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from './common/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotesPage from '../pages/NotesPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import LogoutPage from '../pages/LogoutPage';
import RequireAuth from './RequireAuth';
import authStore from '../stores/authStore';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4285F4' }, // Google Blue
    secondary: { main: '#EA4335' }, // Google Red
    error: { main: '#d32f2f' },
    background: {
      default: '#f7faff',
      paper: '#fff',
    },
  },
});

const HomePage = () => (
  <Container maxWidth="sm" sx={{ mt: 8, background: '#f7faff', borderRadius: 4, boxShadow: 6, py: 6 }}>
    <Box textAlign="center">
      <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, letterSpacing: 1, color: '#4285F4' }}>
        The Vault
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ color: '#EA4335' }}>
        Your private, colorful, and secure notes vault.
      </Typography>
      <Typography variant="body1" sx={{ mt: 4 }}>
        Please <a href="/login" style={{ color: '#34A853', fontWeight: 600 }}>Login</a> or <a href="/signup" style={{ color: '#34A853', fontWeight: 600 }}>Sign Up</a> to get started.
      </Typography>
    </Box>
  </Container>
);

const App = () => {
  const store = authStore();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', width: '100vw', background: '#f7faff', position: 'absolute', top: 0, left: 0 }}>
        <BrowserRouter>
          <Navbar title="The Vault" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/notes"
              element={
                <RequireAuth isAuthenticated={store.loggedIn}>
                  <NotesPage />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default App;
