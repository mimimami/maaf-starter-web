# MAAF Starter Web Dokumentáció

## Áttekintés

MAAF Starter Web egy React/Vite alapú frontend skeleton moduláris UI komponensekkel. Ez a starter kit segít gyorsan elindulni egy új MAAF frontend projektben.

## Funkciók

- ✅ **React + Vite** - Gyors fejlesztési élmény
- ✅ **Moduláris UI Komponensek** - Újrafelhasználható komponensek
- ✅ **API Integráció** - Kész API integráció a MAAF backend-del
- ✅ **Routing** - React Router DOM
- ✅ **State Management** - Zustand
- ✅ **Auth** - Autentikáció kezelés

## Telepítés

```bash
npm install
```

## Fejlesztés

```bash
npm run dev
```

A fejlesztői szerver a `http://localhost:3000` címen érhető el.

## Build

```bash
npm run build
```

A build fájlok a `dist/` mappába kerülnek.

## Projekt Struktúra

```
maaf-starter-web/
├── src/
│   ├── components/          # UI komponensek
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.css
│   │   ├── Input/
│   │   │   ├── Input.jsx
│   │   │   └── Input.css
│   │   ├── Card/
│   │   │   ├── Card.jsx
│   │   │   └── Card.css
│   │   ├── Layout/
│   │   │   ├── Layout.jsx
│   │   │   └── Layout.css
│   │   └── ProtectedRoute/
│   │       └── ProtectedRoute.jsx
│   ├── pages/               # Oldalak
│   │   ├── HomePage.jsx
│   │   ├── Auth/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── Auth.css
│   │   └── DashboardPage.jsx
│   ├── api/                 # API integráció
│   │   ├── client.js
│   │   └── auth.js
│   ├── store/               # State management
│   │   └── authStore.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── vite.config.js
├── package.json
└── README.md
```

## Komponensek

### Button

```jsx
import Button from '@components/Button/Button'

<Button variant="primary" size="lg" onClick={handleClick}>
  Click me
</Button>
```

Variants: `primary`, `secondary`, `success`, `danger`
Sizes: `sm`, `md`, `lg`

### Input

```jsx
import Input from '@components/Input/Input'

<Input
  label="Email"
  type="email"
  name="email"
  value={email}
  onChange={handleChange}
  error={errors.email}
  required
/>
```

### Card

```jsx
import Card from '@components/Card/Card'

<Card title="Title">
  Content here
</Card>
```

## API Integráció

### API Client

Az API client automatikusan hozzáadja az auth token-t a kérésekhez:

```jsx
import apiClient from '@api/client'

const response = await apiClient.get('/users')
```

### Auth API

```jsx
import { authApi } from '@api/auth'

// Login
const data = await authApi.login(email, password)

// Register
const data = await authApi.register(userData)

// Get current user
const data = await authApi.me()
```

## State Management

### Auth Store

```jsx
import { useAuthStore } from '@store/authStore'

const { user, isAuthenticated, login, logout } = useAuthStore()

// Login
await login(email, password)

// Logout
await logout()
```

## Routing

A routing React Router DOM-mal van kezelve:

```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    }
  />
</Routes>
```

## Új Komponens Hozzáadása

1. Hozz létre egy új mappát a `src/components/` mappában
2. Hozz létre a komponens fájlt és CSS fájlt
3. Exportáld a komponenst

Példa:

```jsx
// src/components/Modal/Modal.jsx
import './Modal.css'

function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
```

## Új Oldal Hozzáadása

1. Hozz létre egy új fájlt a `src/pages/` mappában
2. Add hozzá a route-ot az `App.jsx`-hez

Példa:

```jsx
// src/pages/AboutPage.jsx
function AboutPage() {
  return <div>About Page</div>
}

export default AboutPage
```

```jsx
// src/App.jsx
import AboutPage from './pages/AboutPage'

<Route path="/about" element={<AboutPage />} />
```

## További információk

- [Példák](examples.md)
- [Best Practices](best-practices.md)
