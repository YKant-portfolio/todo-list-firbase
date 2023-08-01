# Todo list

## Привет!

Это описание проекта Todo List, где я расскажу о его функциональности, технологическом стеке и других деталях.

## Демо

Вы можете просмотреть демонстрацию проекта, перейдя по ссылке: [Todo list](https://kantcodetodo.karpovdns.net) В приложении вы можете авторизоваться или пойти под своей учетной записью GitHub и Google

## Функциональность

- Авторизация пользователей, включая возможность использовать учетные записи GitHub и Google.
- Защита приватности: каждый пользователь видит только свои задачи.
- Создание новых задач с обязательным указанием текста.
- Удаление задач.
- Изменение текста задач.
- Отметка задачи как выполненной. Автоматическое удаление выполненных задач через 2 секунды.
- Предложение создать новую задачу, когда список задач пуст.

## Технологический стек

<img src="https://img.shields.io/badge/Webpack-464a51?style=for-the-badge&logo=webpack&logoColor=8DD6F9"/> <img src="https://img.shields.io/badge/React-464a51?style=for-the-badge&logo=react&logoColor=8DD6F9"/> <img src="https://img.shields.io/badge/React Router-464a51?style=for-the-badge&logo=react Router&logoColor=8DD6F9"/> <img src="https://img.shields.io/badge/Typescript-464a51?style=for-the-badge&logo=typescript&logoColor=8DD6F9"/> <img src="https://img.shields.io/badge/Mui-464a51?style=for-the-badge&logo=mui&logoColor=8DD6F9"/> <img src="https://img.shields.io/badge/Firebase-464a51?style=for-the-badge&logo=firebase&logoColor=8DD6F9"/>

### Фронтенд

- Webpack
- React 18
- React Router DOM 6
- TypeScript 5
- MUI Material-UI 5
- Emotion 11

### Бэкенд

- Firebase 10

## Установка и запуск

1. Склонируйте репозиторий: `git clone https://github.com/your/repository.git`
2. Перейдите в папку проекта: `cd project-directory`
3. Установите зависимости: `npm install`
4. Запустите приложение в режиме разработки: `npm run start`
5. Откройте приложение в браузере по адресу: [http://localhost:3000](http://localhost:3000)

## CI/CD

Для этого проекта используется CI/CD, чтобы осуществлять пул-реквесты в удаленный репозиторий, код проходит проверку через инструменты Prettier, ESLint и Stylelint, чтобы обеспечить согласованный стиль кодирования.

## Авторизация

Для авторизации в приложении вы можете использовать OAuth-авторизацию через учетные записи GitHub и Google.

## Сервер и SSL-сертификат

Приложение развернуто на сервере Nginx и размещено на хостинге "Karpov" (https://kantcodetodo.karpovdns.net.).
SSL-сертификат был успешно получен и настроен для обеспечения безопасного соединения, обеспечивая безопасную передачу данных между клиентом и сервером.
