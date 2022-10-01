import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SongsContextProvider } from './context/SongContext'
import { AuthContextProvider } from './context/AuthContext'
import { ThemeContextProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <SongsContextProvider>
          <App />
        </SongsContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);