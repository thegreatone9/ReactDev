import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { Reducer, initialState} from './reducer';
import {Leaders} from './leaders';
import {Comments} from './comments';
import {Dishes} from './dishes';
import {Promotions} from './promotions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes:Dishes,
            leaders:Leaders,
            comments:Comments,
            promotions:Promotions
        }),
        applyMiddleware(thunk, logger)    //these stuff are enhancers for our store
    );
    return store;
}


/*
import { Reducer, initialState } from './reducer';
import { createStore } from 'redux';

export const ConfigureStore = () => {
    const store = createStore(Reducer, initialState);
    return store;
}*/