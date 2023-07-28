import React, { FC } from 'react';
import { TodoItem } from '@Components/TodoItem/TodoItem';
import { useTodo } from '@features/todo/TodoContextProvider';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export const TodoList: FC = () => {
  const { todos, isLoading } = useTodo();

  if (isLoading) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', margin: '15px 0' }}>
      {todos.length === 0 ? (
        <Typography variant="h6">Предлагаю создать задачу, список пустой</Typography>
      ) : (
        todos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })
      )}
    </Box>
  );
};
