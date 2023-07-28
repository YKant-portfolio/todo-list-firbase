import React, { FC } from 'react';
import { Header } from '@Components/Header/Header';
import { TodoInputForm } from '@Components/TodoInputForm/TodoInputForm';
import { TodoList } from '@Components/TodoList/TodoList';

import Paper from '@mui/material/Paper';

export const TodoContainer: FC = () => {
  return (
    <Paper
      elevation={6}
      sx={{ padding: '25px 30px', borderRadius: 5, width: '800px', margin: '100px auto 0', textAlign: 'center' }}
    >
      <Header />
      <TodoInputForm />
      <TodoList />
    </Paper>
  );
};
