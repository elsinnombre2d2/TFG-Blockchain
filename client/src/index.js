import React from 'react';
import ReactDOM from 'react-dom/client';

import Provider from './Utilities/Provider';
import AppRouter from "./AppRouter"

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
   
    <AppRouter>

    </AppRouter>
   
  
  </React.StrictMode>
);

