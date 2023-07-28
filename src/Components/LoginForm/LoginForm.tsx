import { Box, Stack } from '@mui/material';
import React, { FC } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export type TLoginField = {
  name: string;
  error?: boolean;
  helper?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type TProps = {
  className?: string;
  email: TLoginField;
  password: TLoginField;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  type: 'authorization' | 'registration';
};

export const LoginForm: FC<TProps> = ({ className, email, password, onSubmit, type }) => {
  return (
    <Box className={className}>
      <form onSubmit={onSubmit} method="POST">
        <Stack direction="column" spacing={1}>
          <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'gray',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'gray',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'gray',
              },
            }}
            fullWidth
            label={email.name}
            variant="outlined"
            name={email.name}
            value={email.value}
            onChange={email.onChange}
            error={!!email.error}
            helperText={email.helper}
          />
          <TextField
            fullWidth
            type="password"
            label={password.name}
            variant="outlined"
            name={password.name}
            value={password.value}
            onChange={password.onChange}
            error={!!password.error}
            helperText={password.helper}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'gray',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'gray',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'gray',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              color: 'white',
              borderColor: 'lightgray',
              backgroundColor: 'gray',
              '&:hover': {
                backgroundColor: 'rgba(211, 211, 211, 0.212)',
                borderColor: 'green',
                color: 'gray',
              },
            }}
          >
            {type === 'authorization' ? 'Войти' : 'Создать аккаунт'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
