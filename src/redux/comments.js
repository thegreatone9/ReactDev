import { COMMENTS } from '../shared/comments'; 
import * as ActionTypes from './ActionTypes';

//each of these reducer files updates its exported state based on the action to the Store (which is a compilation
//of all the reducers and states)
export const Comments = (state = COMMENTS, action) => {
    switch(action.type){
        case ActionTypes.ADD_COMMENT:
            let comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            return state.concat(comment);
        default:
            return state;
    }
};