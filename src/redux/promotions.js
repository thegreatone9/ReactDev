import * as ActionTypes from './ActionTypes';

//the promotions reducer (will be combined with other reducers in store)...takes in actions, and modifies state accordingly
export const Promotions = (state = { //extended to 3 properties
    isLoading : true,   //initially true, since promotions have not loaded
    errMess : null,     //errMess set to corresponding error message from server
    promotions : []         //initially set to empty array, but when loaded (due to ADD_DISHES) it will be full
    }, action) => {
    switch (action.type) {
        
        //these actions will be dispatched into store (which will incorporate this reducer) when we connect a component to the store, and use the mapDispatchToProps 
        case (ActionTypes.ADD_PROMOS):
            return {...state, isLoading: false, errMess: null, promotions: action.payload};

        case (ActionTypes.PROMOS_LOADING):
            return {...state, isLoading: true, errMess: null, promotions: []};     //whatever the current value of state is...i make some changes to the object. Precautionary assignments are made too even though they seem redudant.
        
        case (ActionTypes.PROMOS_FAILED):
            return {...state, isLoading: false, errMess: action.payload, promotions : []};

        default:
            return state;
    }
};