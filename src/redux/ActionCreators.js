import * as ActionTypes from './ActionTypes';

//we import all the different types of actions that we have decided to have and then define how those actions
//would work. Each action that is created is a js object.

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