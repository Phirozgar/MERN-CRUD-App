import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const GoogleDots = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#4285F4', margin: 2, display: 'inline-block' }} />
    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#EA4335', margin: 2, display: 'inline-block' }} />
    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FBBC05', margin: 2, display: 'inline-block' }} />
    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#34A853', margin: 2, display: 'inline-block' }} />
  </div>
);

const LogoutPage = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      navigate('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (!show) return null;

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card sx={{ background: 'rgba(255,255,255,0.95)', boxShadow: 6, borderRadius: 4, borderTop: '6px solid #FBBC05' }}>
        <CardContent>
          <GoogleDots />
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, letterSpacing: 1, color: '#FBBC05' }}>
            Logout
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom sx={{ color: '#34A853' }}>
            You have been successfully logged out.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LogoutPage;