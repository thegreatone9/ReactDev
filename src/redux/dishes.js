import * as ActionTypes from './ActionTypes';

//the dishes reducer...takes in actions, and modifies state accordingly
export const Dishes = (state = { //extended to 3 properties
    isLoading : true,   //initially true, since dishes have not loaded
    errMess : null,     //errMess set to corresponding error message from server
    dishes : []         //initially set to empty array, but when loaded (due to ADD_DISHES) it will be full
    }, action) => {
    switch (action.type) {
        
        case (ActionTypes.ADD_DISHES):
            return {...state, isLoading: false, errMess: null, dishes: action.payload};

        case (ActionTypes.DISHES_LOADING):
            return {...state, isLoading: true, errMess: null, dishes: []};     //whatever the current value of state is...i make some changes to the object. Precautionary assignments are made too even though they seem redudant.
        
        case (ActionTypes.DISHES_FAILED):
            return {...state, isLoading: false, errMess: action.payload, dishes : []};

        default:
            return state;
    }
};