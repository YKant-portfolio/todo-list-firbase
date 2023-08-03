import React, { FC, ReactNode, createContext, useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';

interface SnackbarContextType {
  message: string;
  isOpen: boolean;
  showSnackbar: (message: string) => void;
}

const initialSnackbarState: SnackbarContextType = {
  message: '',
  isOpen: false,
  showSnackbar: () => 'happy',
};

const SnackbarContext = createContext<SnackbarContextType>(initialSnackbarState);

export const useSnackbar = (): SnackbarContextType => useContext(SnackbarContext);

export const SnackbarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        message: snackbarMessage,
        isOpen: snackbarOpen,
        showSnackbar,
      }}
    >
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </SnackbarContext.Provider>
  );
};
