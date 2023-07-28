import React, { FC } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface SnackbarMessageProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export const SnackbarMessage: FC<SnackbarMessageProps> = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      <MuiAlert onClose={onClose} severity="success" elevation={6} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  );
};
