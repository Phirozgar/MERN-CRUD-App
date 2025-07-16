import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const googleColors = [
  '#4285F4', // blue
  '#EA4335', // red
  '#FBBC05', // yellow
  '#34A853', // green
];

function getRandomColor(idx) {
  return googleColors[idx % googleColors.length];
}

const NoteCard = ({ title, content, actions, index }) => {
  const accentColor = getRandomColor(index || 0);
  return (
    <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 4, background: 'linear-gradient(90deg, #fff 80%, #f3f6fd 100%)', borderLeft: `8px solid ${accentColor}` }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ color: accentColor }}>{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{content}</Typography>
        {actions && <div style={{ marginTop: 8 }}>{actions}</div>}
      </CardContent>
    </Card>
  );
};

export default NoteCard; 