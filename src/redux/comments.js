import { COMMENTS } from '../shared/comments';

// This function takes in the existing "state" from the Redux store and updates that state, so the Redux store
// has the current state.

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        default:
            return state;
    }
};