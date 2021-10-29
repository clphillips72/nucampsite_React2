import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';



// export const fetchCampsites = () => dispatch => {
//     dispatch(campsitesLoading());

//     return fetch(baseUrl + 'campsites')                             //  <== calling the campsites data (what's actually in src\shared\campsites.js) using a promise.
//         .then(response => response.json())                          //  <== when that promise is resolved, this .then() method will use the json() method to convert the response from json to javascript
//                                                                     //      and that javascript will be an array of campsites.  
//                                                                     //      
//                                                                     //      The json() method returns a new promise for which the new javascript
//                                                                     //      array is the new response value when it resolves.  So that means we can chain another .then() method below and grab that 
//                                                                     //      javascript array in the campsites argument once that promise resolves.
//         .then(campsites => dispatch(addCampsites(campsites)));      //  <== Then we can dispatch that campsites argument with the addCampsites action creator to be used as its payload.
// };

export const fetchCampsites = () => dispatch => {
    dispatch(campsitesLoading());

    return fetch(baseUrl + 'campsites')                             
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(campsites => dispatch(addCampsites(campsites)))
        .catch(error => dispatch(campsitesFailed(error.message)));
};

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});

// export const fetchComments = () => dispatch => {                    //  <==  This is using Redux Thunk
//     return fetch(baseUrl + 'comments')                              //  <==  Sending a fetch request to the JSON server, which is running at the address stored in baseUrl and we'll ask for the 
//                                                                     //       'comments' resource, which should return a promise for an array of comments objects.
//         .then(response => response.json())                          //  <==  We'll use then(response...) to access that array as the response if the fetch was successful.  Then we
//                                                                     //       use JSON to convert that comments array in JSON format to Javascript comments array.
//         .then(comments => dispatch(addComments(comments)));         //  <==  If the previous then() was successful, we'll dispatch those comments to be added to the Redux store.
// };

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (campsiteId, rating, author, text) => dispatch => {
    
    const newComment = {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('post comment', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        });
};

// export const fetchPromotions = () => dispatch => {
//     dispatch(promotionsLoading());

//     return fetch(baseUrl + 'promotions')
//         .then(response => response.json())
//         .then(promotions => dispatch(addPromotions(promotions)));
// };

export const fetchPromotions = () => dispatch => {
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});