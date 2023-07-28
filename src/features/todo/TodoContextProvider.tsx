import { createTodoApi, deleteTodoApi, getTodosApi, updateTodoApi } from '../../api';
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { ITodo } from 'types';
import { useAuth } from '@features/auth/AuthContextProvider';

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
  const updateTodoList = async (promise: Promise<void>): Promise<void> => {
    try {
      await promise;
      const updatedTodos = await getTodosApi();
      setTodo(updatedTodos);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('ошибка сети или некорректный ответ от сервера', error);
    }
  };

  const createTodo = (data: Omit<ITodo, 'id'>) => {
    return updateTodoList(createTodoApi(data));
  };

  const deleteTodo = (id: string) => {
    return updateTodoList(deleteTodoApi(id));
  };

  const updateTodo = (id: string, data: Omit<ITodo, 'id'>) => {
    return updateTodoList(updateTodoApi(id, data));
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
