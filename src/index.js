import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import {
        createAuthOptions
    } from './amplify-utils';
import { 
        setApiUrl
    } from './web-api';

import { configureAuth } from './contexts/AuthorizationContext';
import App from './components/App';

// Application configuration.

setApiUrl( process.env.REACT_APP_FE_WEB_API_URL );

var config = createAuthOptions();

configureAuth(config);

// Root render.

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
