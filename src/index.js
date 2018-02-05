import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';

import './index.css';
import RootComponent from './RootComponent';
import configureStore from './store';

const history = createHistory();
const store = configureStore();

render(
    <Provider store={store}>
        <Router history={history}>
            <RootComponent/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
