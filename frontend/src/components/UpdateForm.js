import React from 'react';
import CommonTextField from './common/TextField';
import CommonButton from './common/Button';
import notesStore from '../stores/notesStore';
import Box from '@mui/material/Box';

const UpdateForm = () => {
  const store = notesStore();
  if (!store.updateForm._id) return null;

  return (
    <Box component="form" sx={{ mt: 2, mb: 4 }} onSubmit={store.updateNote} autoComplete="off">
      <CommonTextField
        label="Title"
        name="title"
        value={store.updateForm.title}
        onChange={store.handleUpdateFieldChange}
        required
      />
      <CommonTextField
        label="Content"
        name="body"
        value={store.updateForm.body}
        onChange={store.handleUpdateFieldChange}
        multiline
        minRows={3}
        required
      />
      <CommonButton type="submit" color="primary" sx={{ mr: 1 }}>Update Note</CommonButton>
      <CommonButton type="button" color="secondary" onClick={store.clearUpdateForm}>Cancel</CommonButton>
    </Box>
  );
};

export default UpdateForm;
