import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import { AuthProvider } from './AuthContex';




ReactDOM.render(
  <AuthProvider>
    < App />
  </AuthProvider>
    ,
  document.getElementById('root')
);
