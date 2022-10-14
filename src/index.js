import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SongsContextProvider } from './context/SongContext'
import { AuthContextProvider } from './context/AuthContext'
import { AppModeContextProvider } from './context/AppModeContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthContextProvider>
        <SongsContextProvider>
          <AppModeContextProvider>
            <App />
          </AppModeContextProvider>
        </SongsContextProvider>
      </AuthContextProvider>
  </React.StrictMode>
);