import { createTodoApi, deleteTodoApi, getTodosApi, updateTodoApi } from '../../api';
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { ITodo } from 'types';
import { useAuth } from '@features/auth/AuthContextProvider';
import { useSnackbar } from './SnackbarMessage';

interface ITodoContext {
  todos: ITodo[];
  createTodo: (data: Omit<ITodo, 'id'>) => Promise<any>;
  deleteTodo: (id: string) => Promise<any>;
  updateTodo: (id: string, data: Omit<ITodo, 'id'>) => Promise<any>;
  isLoading: boolean;
}

const TodoContext = createContext<ITodoContext>({
  todos: [],
  createTodo: () => Promise.reject(),
  deleteTodo: () => Promise.reject(),
  updateTodo: () => Promise.reject(),
  isLoading: false,
});

export const useTodo = (): ITodoContext => useContext(TodoContext);

export const TodoContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodo] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    setTodo([]);
    if (user) {
      setIsLoading(true);
      getTodosApi()
        .then(setTodo)
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  // Вспомогательная функция для единообразной обработки обновления, удаления и создания задач
  const updateTodoList = (): void => {
    getTodosApi()
      .then(setTodo)
      .catch((error) => {
        showSnackbar('ошибка сети или некорректный ответ от сервера');
        throw error;
      });
  };

  const createTodo = (data: Omit<ITodo, 'id'>) => {
    return createTodoApi(data).then(updateTodoList);
  };

  const deleteTodo = (id: string) => {
    return deleteTodoApi(id).then(updateTodoList);
  };

  const updateTodo = (id: string, data: Omit<ITodo, 'id'>) => {
    return updateTodoApi(id, data).then(updateTodoList);
  };

  const todoContextValue: ITodoContext = {
    todos,
    createTodo,
    deleteTodo,
    updateTodo,
    isLoading,
  };

  return <TodoContext.Provider value={todoContextValue}>{children}</TodoContext.Provider>;
};
