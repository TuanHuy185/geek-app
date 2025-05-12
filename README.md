# Geek App

A modern React application built with Vite

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
Create a `.env` file in the root directory with the following variables:
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

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- React 18
- Vite
- Redux Toolkit
- React Router DOM
- Styled Components
- Tailwind CSS

## Project Structure

```
geek-app/
├── src/
├── public/
├── .env
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
