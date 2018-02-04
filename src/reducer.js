import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import Components from './Components';


const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    news: Components.reducers.news,
    articles: Components.reducers.articles,
    modal: Components.reducers.modal
});



export default rootReducer;