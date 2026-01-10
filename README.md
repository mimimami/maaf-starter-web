# MAAF Starter Web

React/Vite alapú frontend skeleton moduláris UI komponensekkel.

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

## Build

```bash
npm run build
```

## Struktúra

```
maaf-starter-web/
├── src/
│   ├── components/      # UI komponensek
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Layout/
│   │   └── ProtectedRoute/
│   ├── pages/           # Oldalak
│   │   ├── HomePage.jsx
│   │   ├── Auth/
│   │   └── DashboardPage.jsx
│   ├── api/             # API integráció
│   │   ├── client.js
│   │   └── auth.js
│   ├── store/           # State management
│   │   └── authStore.js
│   ├── App.jsx
│   └── main.jsx
├── public/
└── package.json
```

## Használat

Lásd a [dokumentációt](docs/README.md) részletes információkért.

## Licenc

MIT License
