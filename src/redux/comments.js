// import { COMMENTS } from '../shared/comments';
// We're no longer getting COMMENTS from the location above as we're now 
// getting it from the server in ActionCreators.js where fetchComments is.
import * as ActionTypes from './ActionTypes';

export const Comments = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;             //  <== loading the action.payload object to "comment" 
            comment.id = state.length;                  //  <== adding an attribute of "id" to comment object
            comment.date = new Date().toISOString();    //  <== adding an attribute of "date" to comment object
            return state.concat(comment);               //  <== create new state array and return state
        case ActionTypes.ADD_COMMENT:                    
            const comment = action.payload;             //  <== loading the action.payload object to "comment"
            comment.id = state.comments.length;         //  <== adding an attribute of "id" to comment object
            comment.date = new Date().toISOString();    //  <== adding an attribute of "date" to comment object
            return {...state, comments: state.comments.concat(comment)};  //  <== create new state array and return state
        default:
            return state;
    }
};