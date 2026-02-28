# trello-app
---
This is a trello website project. The project is built on ReactJs (Vite), JavaScript, MUI.

<img width="1918" height="1007" aapplt="Screenshot from 2026-02-28 17-12-45" src="https://github.com/user-attachments/assets/fca5a20a-912f-4044-bcd1-e873a62d4e76" />

- Frontend Deploy (Vercel): [https://trello-web-application.vercel.app]
---

## 1. Key Features

The project has one part: front-end (Client).

- Authentication:

  - Registration and Login using bcrypt (password hashing) and JWT (JSON Web Token).

  - Uses httpOnly cookies for accessToken and refreshToken, enhancing security (prevents XSS).

- Search:
 
  - Real-time search suggestions (using debounce) directly under the search bar.

- User Account (Private Routes):

  - Account information page (update avatar, details).
 
- Notification Real-time:

  - Built real-time notification system with Socket.io.
 
  - Automatic authentication via httpOnly cookie on socket connection.
 
## 2. Tech Stack

- Framework/Library: React 18, Vite

- Language: JavaScript

- Routing: React Router v6+

- State Management: Redux Toolkit

- API Client: Axios

- Real-time: Socket.io-client

- Components: Material-UI (MUI) (for Skeletons, Menus, Dialogs)

- Validator: react-hook-form

2.3. Deployment

- Frontend: Vercel (connected to the front-end directory and vercel.json for SPA routing)

--- 



