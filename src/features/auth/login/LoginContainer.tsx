import React, { FC, Reducer, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALLOWED_OAUTH_PROVIDERS, useAuth } from '../AuthContextProvider';
import { validateEmail } from './utils';
import { LoginForm, TLoginField } from '@Components/LoginForm/LoginForm';

import './LoginContainer.css';
import Typography from '@mui/material/Typography';
import { ProviderId, UserCredential } from 'firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import { useSnackbar } from '@features/todo/SnackbarMessage';

type TLoginFieldState = Omit<TLoginField, 'onChange'>;

type TAction = {
  type: 'change' | 'error';
  value: string;
};

const getOauthProviderIcon = (provider: string) => {
  switch (provider) {
    case ProviderId.GOOGLE:
      return <GoogleIcon fontSize="inherit" />;
    case ProviderId.GITHUB:
      return <GitHubIcon fontSize="inherit" />;
    default:
      return <LoginIcon fontSize="inherit" />;
  }
};

const reducer = (state: TLoginFieldState, action: TAction): TLoginFieldState => {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        value: action.value,
        error: false,
        helper: '',
      };
    case 'error':
      return {
        ...state,
        error: true,
        helper: action.value,
      };
    default:
      return state;
  }
};

interface Props {
  type?: 'registration' | 'authorization';
}

export const LoginContainer: FC<Props> = ({ type = 'authorization' }) => {
  const navigate = useNavigate();
  const { loginWithEmailAndPassword, loginWithPopup, signUpUserWithEmailAndPassword } = useAuth();
  const [emailState, dispatchEmail] = useReducer<Reducer<TLoginFieldState, TAction>>(reducer, {
    name: 'email',
    value: '',
  });
  const [passwordState, dispatchPassword] = useReducer<Reducer<TLoginFieldState, TAction>>(reducer, {
    name: 'password',
    value: '',
  });

  const { showSnackbar } = useSnackbar();

  const processLogin = async (promise: Promise<UserCredential>): Promise<void> => {
    try {
      await promise;
      return navigate('/');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        return showSnackbar('Пользователь с таким email уже существует.');
      }
      return showSnackbar('Пользователь с такими учетными данными не найден');
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    if (!validateEmail(emailState.value)) {
      isValid = false;
      dispatchEmail({ type: 'error', value: 'Введите корректный email' });
    }

    if (passwordState.value.length <= 6) {
      isValid = false;
      dispatchPassword({
        type: 'error',
        value: 'Минимальная длина пароля - 6 символов',
      });
    }
    if (isValid) {
      if (type === 'registration') {
        processLogin(signUpUserWithEmailAndPassword(emailState.value, passwordState.value));
      } else {
        processLogin(loginWithEmailAndPassword(emailState.value, passwordState.value));
      }
    }
  };

  const onOauthClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const dataset = (e.target as HTMLElement)?.closest<HTMLLinkElement>('.login-oauth-container__item')?.dataset;
    if (dataset?.providerid) {
      processLogin(loginWithPopup(dataset.providerid));
    }
  };

  return (
    <div className={'login-container'}>
      <Typography variant="h4" color="gray" sx={{ textAlign: 'center', mb: 2 }}>
        {type === 'authorization' ? 'Авторизация' : 'Регистрация'}
      </Typography>
      <LoginForm
        email={{ ...emailState, onChange: (e) => dispatchEmail({ type: 'change', value: e.target.value }) }}
        password={{ ...passwordState, onChange: (e) => dispatchPassword({ type: 'change', value: e.target.value }) }}
        onSubmit={onSubmit}
        type={type}
      />
      {type === 'authorization' ? (
        <div className="login-oauth-container">
          {Object.keys(ALLOWED_OAUTH_PROVIDERS).map((key) => {
            return (
              <Button
                fullWidth
                key={key}
                variant="outlined"
                className="login-oauth-container__item"
                size="large"
                data-providerid={key}
                startIcon={getOauthProviderIcon(key)}
                onClick={onOauthClick}
                sx={{ mb: 1, color: 'gray', borderColor: 'lightgray' }}
              >
                Войти с помощью {key.split('.')[0]}
              </Button>
            );
          })}
          <Button
            variant="outlined"
            className="login-oauth-container__item"
            fullWidth
            onClick={() => navigate('/signup')}
            sx={{ mt: '15px', color: 'gray', borderColor: 'lightgray' }}
          >
            Зарегистрироваться?
          </Button>
        </div>
      ) : (
        <div className="login-oauth-container">
          <Button
            variant="outlined"
            className="login-oauth-container__item"
            fullWidth
            onClick={() => navigate('/login')}
            sx={{ color: 'gray', borderColor: 'lightgray' }}
          >
            Уже есть аккаунт?
          </Button>
        </div>
      )}
    </div>
  );
};
