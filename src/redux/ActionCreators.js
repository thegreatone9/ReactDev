import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

//we import all the different types of actions that we have decided to have and then define how those actions
//would work. Each action that is created is a js object. These actions will be fed into the dispatcher via the mapDispatch functions.

export const addComment = function (dishId, rating, author, comment) {
    console.log(dishId, rating, author, comment);
    return ({
        type : ActionTypes.ADD_COMMENT,
        payload : {
            dishId : dishId,
            rating : rating,
            author : author,
            comment : comment
        } 
    });
};

//send this action object to the specific component's props (in our case the MainComponent) from where you want to dispatch it into store

//this addComment function should just be changing the 'comments' part of the state, so we 
//should go to the comments.js reducer file next...


//This action function is returning a function as opposed to an action object...it is a thunk, which
//will be used to dispatch a function into the store
export const fetchDishes = () => (dispatch) => {
    //this is a signal to the store:
    dispatch(dishesLoading(true));

    //after a 2s delay, the DISHES will finally be dispatched into the state of our store
    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000);
}

//these return objects...they are not thunk
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

