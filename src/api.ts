import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ITodo } from 'types';

export const initializeAPI = (): FirebaseApp => {
  const firebaseConfig = {
    apiKey: 'AIzaSyByaoDZDzhItuTMta22DSFjUJJSxLrJ7qE',
    authDomain: 'todo-868c6.firebaseapp.com',
    projectId: 'todo-868c6',
    storageBucket: 'todo-868c6.appspot.com',
    messagingSenderId: '89957220020',
    appId: '1:89957220020:web:3d7746f8b6b149182b61e1',
  };

  const firebaseApp = initializeApp(firebaseConfig);
  getFirestore(firebaseApp);
  getAuth(firebaseApp);

  return firebaseApp;
};

export const getTodosApi = async (): Promise<ITodo[]> => {
  const db = getFirestore();
  const auth = getAuth();
  const todos: ITodo[] = [];
  const ref = collection(db, 'todo');
  const q = query(ref, where('userId', '==', auth.currentUser?.uid));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<ITodo, 'id'>;
      todos.push({ id: doc.id, ...data });
    });
  } catch (error) {
    return Promise.reject(error);
  }
  return todos;
};

export const deleteTodoApi = async (id: string): Promise<any> => {
  const db = getFirestore();
  try {
    await deleteDoc(doc(db, 'todo', id));
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createTodoApi = async (data: Omit<ITodo, 'id'>): Promise<any> => {
  const db = getFirestore();
  const auth = getAuth();
  try {
    await addDoc(collection(db, 'todo'), { ...data, userId: auth.currentUser?.uid });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateTodoApi = async (id: string, data: Omit<ITodo, 'id'>): Promise<any> => {
  const db = getFirestore();

  try {
    await updateDoc(doc(db, 'todo', id), data);
  } catch (error) {
    return Promise.reject(error);
  }
};
