import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
const container = document.getElementById('App');
const root = createRoot(container);

import '@jetbrains/ring-ui/dist/style.css'
import '@jetbrains/ring-ui/dist/style.css';
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
