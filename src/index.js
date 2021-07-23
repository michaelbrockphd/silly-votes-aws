import './index.css';

import Amplify from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

// Make use of any required environment variables.

import ampConfig from './aws-exports';
Amplify.configure(ampConfig);

// State the render from the App.

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
