import '@fontsource/fira-sans';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { registerSW } from 'virtual:pwa-register';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

registerSW({ immediate: true });
