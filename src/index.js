import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import '../node_modules/react-modal-video/scss/modal-video.scss';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store ={store}>
        <App />
    </Provider>
);


