import React, { FC } from 'react';
import { RouteProps, Navigate } from 'react-router-dom';
import { useAuth } from '@features/auth/AuthContextProvider';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

type Tprops = {
  children?: React.ReactNode;
} & RouteProps;

export const PrivateRoute: FC<Tprops> = ({ children }) => {
  const { isAuthenticate } = useAuth();

  if (isAuthenticate === null) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }
  return isAuthenticate ? <>{children}</> : <Navigate to="/login" />;
};
