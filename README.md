https://geek-app.vercel.app/
# Geek App

A modern React application for viewing users, albums, and photos, built with Vite and Redux.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
cd geek-app
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Environment Setup
The app uses these environment variables (already configured in .env):
```properties
VITE_REACT_APP_API_URL=https://jsonplaceholder.typicode.com
VITE_TODOS_API=/todos
VITE_USERS_API=/users
VITE_ALBUMS_API=/albums
VITE_PHOTOS_API=/photos
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Features

- **User Management**: View user list and individual user details
- **Album Management**: Browse albums with pagination
- **Photo Gallery**: View album photos with interactive image viewer
- **Responsive Design**: Mobile and desktop friendly layout
- **State Persistence**: Using Redux Persist for maintaining state between sessions
- **Error Handling**: Graceful error boundaries

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: React Router DOM (HashRouter)
- **Styling**: Tailwind CSS
- **UI Components**: React Icons, Lucide React
- **Additional Libraries**: React Toastify

## Project Structure

```
geek-app/
├── src/
│   ├── app/               # Feature-based components
│   │   ├── Album/         # Album feature components
│   │   └── User/          # User feature components
│   ├── assets/            # Static assets
│   ├── components/        # Reusable UI components
│   │   ├── header/        # Header components
│   │   ├── layout/        # Layout components
│   │   └── slidebar/      # Sidebar components
│   ├── context/           # React context
│   ├── store/             # Redux store
│   │   ├── UserSlice.jsx  # User-related state
│   │   └── AlbumSlice.jsx # Album-related state
│   └── styles/            # Global styles
├── .env                   # Environment variables
├── vite.config.js         # Vite configuration
└── tailwind.config.js     # Tailwind CSS configuration
```

## License

This project is licensed under the MIT License.
