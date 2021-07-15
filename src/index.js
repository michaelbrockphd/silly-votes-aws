import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import { setApiUrl } from './web-api';

// Make use of any required environment variables.

setApiUrl( process.env.REACT_APP_FE_WEB_API_URL );

// State the render from the App.

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
