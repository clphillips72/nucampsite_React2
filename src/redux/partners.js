import { PARTNERS } from '../shared/partners';

// This function takes in the existing "state" from the Redux store and updates that state, so the Redux store
// has the current state.

export const Partners = (state = PARTNERS, action) => {
    switch (action.type) {
        default:
            return state;
    }
};