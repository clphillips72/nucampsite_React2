import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;             //  <== loading the action.payload object to "comment" 
            comment.id = state.length;                  //  <== adding an attribute of "id" to comment object
            comment.date = new Date().toISOString();    //  <== adding an attribute of "date" to comment object
            return state.concat(comment);               //  <== create new state array and return state
        default:
            return state;
    }
};