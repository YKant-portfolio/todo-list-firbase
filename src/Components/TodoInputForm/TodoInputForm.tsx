import React, { FC, FormEvent, useState } from 'react';
import { useTodo } from '../../features/todo/TodoContextProvider';
import TextField from '@mui/material/TextField/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useSnackbar } from '@features/todo/SnackbarMessage';

export const TodoInputForm: FC = () => {
  const [inputvalue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const { showSnackbar } = useSnackbar();

  const { createTodo } = useTodo();

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputvalue.trim()) {
      return setInputError('Нужен текст вашей задачи');
    }
    setInputValue('');
    setInputError('');
    onSubmit(inputvalue);
    showSnackbar('Задача успешно добавлена');
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(() => value);
  };

  const clearInputError = () => {
    setInputError('');
  };

  const onSubmit = async (inputvalue: string) => {
    await createTodo({ description: inputvalue });
  };

  return (
    <Box component="form" sx={{ display: 'flex', justifyContent: 'space-between' }} noValidate onSubmit={onSubmitForm}>
      <TextField
        value={inputvalue}
        onChange={onChange}
        onClick={clearInputError}
        label="Добавьте новую задачу"
        variant="outlined"
        sx={{
          width: '100%',
          paddingRight: '10px',
          color: 'gray',
          borderColor: 'gray',
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: 'green',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'green',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'green',
          },
        }}
        error={!!inputError.length}
        helperText={inputError}
      />
      <Button
        type="submit"
        variant="outlined"
        sx={{
          padding: '0 25px',
          maxHeight: '54px',
          color: 'gray',
          borderColor: 'lightgray',
          '&:hover': {
            backgroundColor: 'rgba(211, 211, 211, 0.212)',
            borderColor: 'green',
            color: 'green',
          },
        }}
        endIcon={<LibraryAddIcon fontSize="medium" />}
      >
        создать
      </Button>
    </Box>
  );
};
