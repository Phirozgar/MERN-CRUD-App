import React from 'react';
import Notes from '../components/Notes';
import Loader from '../components/common/Loader';
import Container from '@mui/material/Container';
import notesStore from '../stores/notesStore';
import CreateForm from '../components/CreateForm';
import UpdateForm from '../components/UpdateForm';
import Typography from '@mui/material/Typography';

const NotesPage = () => {
  const store = notesStore();

  React.useEffect(() => {
    store.fetchNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="sm" sx={{
      background: '#f7faff',
      borderRadius: 4,
      boxShadow: 6,
      py: 4,
      mt: 4,
    }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, letterSpacing: 1, color: '#4285F4' }}>
        The Vault Notes
      </Typography>
      <CreateForm />
      <UpdateForm />
      {store.loading ? (
        <Loader />
      ) : (
        <Notes
          notes={store.notes}
          onDelete={store.deleteNote}
          onEdit={store.toggleUpdate}
        />
      )}
    </Container>
  );
};

export default NotesPage;