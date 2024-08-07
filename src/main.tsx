import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import WebApp from '@twa-dev/sdk';
import { RouterProvider } from 'react-router-dom';
import { router } from './core/router';
WebApp.ready();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
