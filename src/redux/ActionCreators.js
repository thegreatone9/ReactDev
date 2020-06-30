import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

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

    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
}

export const fetchComments = () => (dispatch) => {
    
    //after a 2s delay (due to json-server flag), fetch API will load stuff:
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok){
                return response;
            }
            else {
                var error = new Error("Error: " + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        }    
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
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


export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});



export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());
    //after a 2s delay (due to json-server flag), fetch API will load stuff:
    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok){
                return response;
            }
            else {
                var error = new Error('Error: ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        }
        )
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}


//these return objects...they are not thunk
export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});
