import React, { useState, useEffect } from 'react';
import { useAuth } from '@features/auth/AuthContextProvider';

import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { logOut, user } = useAuth();
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState<string>();

  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  useEffect(() => {
    if (user) {
      const { displayName, email } = user;
      const { photoURL } = user.providerData[0];

      if (displayName) {
        setUserName(displayName);
      } else {
        setUserName(email ?? '');
      }

      if (photoURL) {
        setAvatar(photoURL);
      }
    }
  }, [user]);

  return (
    <Grid container justifyContent="space-between" alignItems="center" marginBottom="20px">
      <Grid item xs={4} container justifyContent="flex-start" alignItems="center">
        <Avatar src={avatar} alt={userName} sx={{ marginLeft: '10px', width: 60, height: 60 }} />
        <Typography variant="body1" sx={{ color: 'gray', marginLeft: '15px', fontSize: '20px' }}>
          {userName}
        </Typography>
      </Grid>
      <Grid item xs={4} textAlign="center">
        <Typography variant="h1" gutterBottom sx={{ fontSize: 42, color: 'gray' }}>
          Задачи
        </Typography>
      </Grid>
      <Grid item xs={4} container justifyContent="flex-end">
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
