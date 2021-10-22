//Now this project is using Redux reducer to create and update state, rather than React 

import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';

export const initialState = {
    campsites: CAMPSITES,
    comments: COMMENTS,
    partners: PARTNERS,
    promotions: PROMOTIONS
};

// If no state is passed into this function when it's called, then state is set to the initalState value defined above.  
// Since we need to access this constant, and the one above, from other files, we added 'export' to the definition.
export const Reducer = (state = initialState, action) => {
    return state;
};