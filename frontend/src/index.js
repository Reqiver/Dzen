import React from 'react';
import ReactDOM from 'react-dom';

import { store } from './store';
import { Provider } from 'react-redux';

import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-day-picker/lib/style.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './api/notification';
import './style/home.scss';
import './style/signup.scss';
import './style/forgotpass.scss';
import './style/media.css';
import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faCoffee, fas, faCamera, faPaperPlane, faEnvelope, faKey, faUserTie, faFilter} from '@fortawesome/free-solid-svg-icons';
library.add(fab, faSearch, faCoffee, fas, faCamera, faPaperPlane, faEnvelope, faKey, faUserTie, faFilter);



function playlist(state=[], action) {
    if(action.type === 'ADD_TRACK'){
        return [
            ...state,
            action.payload
        ];
    }
    return state;
}


store.subscribe(() => {
    console.log('subscribe', store.getState())
})

store.dispatch({type: 'ADD_TRACK', payload:'data'})





ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>,
    document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
