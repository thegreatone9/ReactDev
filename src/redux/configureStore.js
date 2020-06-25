import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { Reducer, initialState} from './reducer';
import { createForms } from 'react-redux-form'; //enables us to input form state into our store
import {Leaders} from './leaders';
import {Comments} from './comments';
import {Dishes} from './dishes';
import {Promotions} from './promotions';
import { InitialFeedback } from './forms';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes:Dishes,
            leaders:Leaders,
            comments:Comments,
            promotions:Promotions,
            ...createForms({                  //create a reduce that takes care of the form
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)    //these stuff are enhancers for our store, and thunker and logger are now available in our application
        
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