import React, { FC, useState } from 'react';
import { ITodo } from 'types';
import { useTodo } from '@features/todo/TodoContextProvider';
import { SnackbarMessage } from '@features/todo/SnackbarMessage';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

export const TodoItem: FC<ITodo> = ({ description, id }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [taskDescription, setTaskDescription] = useState(description);
  const { deleteTodo, updateTodo } = useTodo();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const onSaveEdit = async () => {
    if (taskDescription !== description) {
      try {
        await updateTodo(id, { description: taskDescription });
        setSnackbarMessage('Задача успешно обновлена');
        setSnackbarOpen(true);
      } catch {
        setSnackbarMessage('Ошибка при обновлении задачи:');
        setSnackbarOpen(true);
      } finally {
        setIsEdit(false);
      }
    } else {
      setIsEdit(false);
    }
  };

  const onDeleteTodo = () => {
    setSnackbarMessage('Задача успешно удалена');
    setSnackbarOpen(true);
    setTimeout(() => {
      setSnackbarOpen(false);
      deleteTodo(id);
    }, 1000);
  };

  const completeTodo = () => {
    setIsChecked(true);
    setSnackbarMessage('Задача успешно выполнена');
    setSnackbarOpen(true);
    setTimeout(() => deleteTodo(id), 2000);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Paper
      elevation={2}
      sx={{ display: 'flex', justifyContent: 'space-between', m: '10px 0', p: '15px 20px', cursor: 'pointer' }}
    >
      {isEdit ? (
        <TextField value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
      ) : (
        <Typography
          variant="h4"
          sx={{
            color: 'gray',
            marginRight: '10px',
            fontSize: '22px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setIsEdit(true)}
        >
          {description}
        </Typography>
      )}
      <Box>
        <Checkbox edge="start" onChange={completeTodo} checked={isChecked} tabIndex={-1} />
        {!isEdit && (
          <IconButton edge="end" sx={{ mr: 0 }} onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        )}
        <IconButton edge="end" onClick={onDeleteTodo}>
          <DeleteForeverIcon />
        </IconButton>
        {isEdit && (
          <>
            <IconButton sx={{ fontSize: '18px', margin: '0 5px 0 20px' }} edge="end" onClick={onSaveEdit}>
              Сохранить
            </IconButton>
            <IconButton sx={{ fontSize: '18px' }} edge="end" onClick={() => setIsEdit(false)}>
              Отменить
            </IconButton>
          </>
        )}
        <SnackbarMessage open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} />
      </Box>
    </Paper>
  );
};
