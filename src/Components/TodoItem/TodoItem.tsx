import React, { FC, useEffect, useState } from 'react';
import { ITodo } from 'types';
import { useTodo } from '@features/todo/TodoContextProvider';
import { useSnackbar } from '@features/todo/SnackbarMessage';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { Timestamp } from 'firebase/firestore';

export const TodoItem: FC<ITodo> = ({ description, id, createdAt, updatedAt }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [taskDescription, setTaskDescription] = useState(description);
  const { deleteTodo, updateTodo } = useTodo();
  const { showSnackbar } = useSnackbar();
  const [createdDate, setCreatedDate] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');

  const formatDate = (timestamp: Timestamp) => {
    if (timestamp && timestamp.seconds) {
      const milliseconds = timestamp.seconds * 1000;
      const date = new Date(milliseconds);
      return format(date, 'HH:mm dd MMMM yyyy', { locale: ru });
    }
    return null;
  };

  useEffect(() => {
    const updatedFormattedDate = formatDate(updatedAt);
    if (updatedFormattedDate) {
      setUpdatedDate(updatedFormattedDate);
    }
  }, [updatedAt]);

  useEffect(() => {
    if (createdAt) {
      const createdFormattedDate = formatDate(createdAt);
      if (createdFormattedDate) {
        setCreatedDate(createdFormattedDate);
      }
    }
  }, [createdAt]);

  const onSaveEdit = async () => {
    if (taskDescription !== description) {
      try {
        await updateTodo(id, { description: taskDescription });
        showSnackbar('Задача успешно обновлена');
      } catch {
        showSnackbar('Ошибка при обновлении задачи:');
      } finally {
        setIsEdit(false);
      }
    } else {
      setIsEdit(false);
    }
  };

  const onDeleteTodo = () => {
    showSnackbar('Задача успешно удалена');
    setTimeout(() => {
      deleteTodo(id);
    }, 0);
  };

  const completeTodo = () => {
    setIsChecked(true);
    showSnackbar('Задача успешно выполнена');
    const timeoutId = setTimeout(() => {
      deleteTodo(id);
      clearTimeout(timeoutId);
    }, 0);
  };

  return (
    <Paper
      elevation={2}
      sx={{ display: 'flex', justifyContent: 'space-between', m: '10px 0', p: '15px 20px', cursor: 'pointer' }}
    >
      {isEdit ? (
        <TextField value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
      ) : (
        <>
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
          <Typography
            variant="h4"
            sx={{
              color: 'gray',
              fontSize: '12px',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginLeft: 'auto',
              paddingRight: '20px',
            }}
          >
            {updatedAt ? `обновлен в: ${updatedDate}` : `создан: ${createdDate}`}
          </Typography>
        </>
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
      </Box>
    </Paper>
  );
};
