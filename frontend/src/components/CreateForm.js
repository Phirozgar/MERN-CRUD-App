import React from 'react';
import CommonTextField from './common/TextField';
import CommonButton from './common/Button';
import notesStore from '../stores/notesStore';
import Box from '@mui/material/Box';

const CreateForm = () => {
  const store = notesStore();

  return (
    <Box component="form" sx={{ mt: 2, mb: 4 }} onSubmit={store.createNote} autoComplete="off">
      <CommonTextField
        label="Title"
        name="title"
        value={store.createForm.title}
        onChange={store.updateCreateFormField}
        required
      />
      <CommonTextField
        label="Content"
        name="body"
        value={store.createForm.body}
        onChange={store.updateCreateFormField}
        multiline
        minRows={3}
        required
      />
      <CommonButton type="submit">Create Note</CommonButton>
    </Box>
  );
};

export default CreateForm;