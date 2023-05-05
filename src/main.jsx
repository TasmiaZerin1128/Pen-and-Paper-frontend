import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/Contexts';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
