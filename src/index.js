import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { setApiUrl } from './web-api';
import { initialiseAuth } from './contexts/AuthorizationContext';
import { createAuthOptions } from './amplify-utils';

// Make use of any required environment variables.

setApiUrl( process.env.REACT_APP_FE_WEB_API_URL );

const authConfig = createAuthOptions();
initialiseAuth(authConfig);

// State the render from the App.

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
