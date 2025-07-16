import React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LoginForm from '../components/LoginForm';
import authStore from '../stores/authStore';
import Alert from '../components/common/Alert';

const GoogleDots = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#4285F4', margin: 2, display: 'inline-block' }} />
    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#EA4335', margin: 2, display: 'inline-block' }} />
    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FBBC05', margin: 2, display: 'inline-block' }} />
    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#34A853', margin: 2, display: 'inline-block' }} />
  </div>
);

const LoginPage = () => {
  const store = authStore();
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card sx={{ background: 'rgba(255,255,255,0.95)', boxShadow: 6, borderRadius: 4, borderTop: '6px solid #4285F4' }}>
        <CardContent>
          <GoogleDots />
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, letterSpacing: 1, color: '#4285F4' }}>
            Login
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom sx={{ color: '#EA4335' }}>
            Welcome back to The Vault
          </Typography>
          {store.errorMessage && <Alert severity="error">{store.errorMessage}</Alert>}
          <LoginForm />
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;