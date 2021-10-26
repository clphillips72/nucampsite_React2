import { PROMOTIONS } from '../shared/promotions';

// This function takes in the existing "state" from the Redux store and updates that state, so the Redux store
// has the current state.

export const Promotions = (state = PROMOTIONS, action) => {
    switch (action.type) {
        default:
            return state;
    }
};