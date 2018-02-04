import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducer';
import createHistory from 'history/createBrowserHistory';


const history = createHistory();

const middleware = routerMiddleware(history);
const middlewares = [thunkMiddleware, middleware];


export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middlewares),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    return store;
}


