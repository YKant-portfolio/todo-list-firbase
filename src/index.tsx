import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './Components/App/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { TodoContextProvider } from './features/todo/TodoContextProvider';
import { AuthContextProvider } from '@features/auth/AuthContextProvider';
import { initializeAPI } from './api';

const firebaseApp = initializeAPI();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AuthContextProvider firebaseApp={firebaseApp}>
    <TodoContextProvider>
      <Router>
        <App />
      </Router>
    </TodoContextProvider>
  </AuthContextProvider>
);
