import { CAMPSITES } from '../shared/campsites';       // <== that is the Campsite Data object

// This function takes in the existing "state" from the Redux store and updates that state, so the Redux store
// has the current state.

export const Campsites = (state = CAMPSITES, action) => {
    switch (action.type) {
        default:
            return state;
    }
};