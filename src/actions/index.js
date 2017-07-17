import { API } from '../API';

export const GET_RESTAURANTS = 'GET_RESTAURANTS';
export const RESTAURANT_SELECTED = 'RESTAURANT_SELECTED';
export const SUCCESSFUL_TIP_SUBMIT = 'SUCCESSFUL_TIP_SUBMIT';
export const ERROR = 'ERROR';

/**
 * An action for selecting a restaurant
 * @param {Object} restaurant
 * @returns {{type: string, payload: Object}}
 */
export function selectRestaurant(restaurant) {
    return {
        type: RESTAURANT_SELECTED,
        payload: restaurant
    };
}

/**
 * A wrapper around getCurrentPosition to hide its ugliness.
 * @returns {Promise}
 */
function getLocation(){
    const geoLocation = navigator.geolocation;

    return new Promise((resolve, reject) => {
        if(!geoLocation){
            reject(new Error('The location is not available'));
        }

        geoLocation.getCurrentPosition(position => {
            resolve(position);
        }, error => {
            reject(error);
        });
    });
}

/**
 * An action to get a surprise restaurant
 * @returns {function(*)}
 */
export function getASurpriseRestaurant() {
    return dispatch => {
        getLocation()
            .then(API.getASurpriseRestaurant)
            .then(({data}) => {
                dispatch({
                    type: RESTAURANT_SELECTED,
                    payload: data
                });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error });
            });
    };
}

/**
 * An action to get nearby restaurants
 * @returns {function(*)}
 */
export function getNearbyRestaurants() {
    return dispatch => {
        getLocation()
            .then(API.getRestaurants)
            .then(({data}) => {
                dispatch({
                    type: GET_RESTAURANTS,
                    payload: {
                        data: data
                    }
                });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error });
            });
    };
}

/**
 * This function will handle redirect coming from foursquare
 * @returns {Function | Object}
 */
export function handleFoursquareRedirect(successCallback) {
    let state, access_token;
    let callbackUri = window.location.href;
    // Gets everything after redirect#
    let urlSegment = callbackUri.substring(callbackUri.indexOf('redirect#') + 9).split('&');

    // Get the values of access_token and state
    urlSegment.forEach(subSegment => {
        let paramData = subSegment.split('=');
        if(paramData[0] === 'access_token'){
            access_token = paramData[1];
        }else if(paramData[0] === 'state'){
            state = paramData[1];
        }
    });

    if(state && access_token) {
        // Base64 decode
        const reviewObject = JSON.parse(decodeURIComponent(atob(decodeURIComponent(state))));

        reviewObject.oauthToken = access_token;

        const requestPromise = API.postComment(reviewObject);

        return dispatch => {
            requestPromise.then(({data}) => {
                successCallback();
                dispatch({
                    type: SUCCESSFUL_TIP_SUBMIT,
                    payload: data
                });
            }).catch(error => {
                dispatch({
                    type: ERROR,
                    payload: error
                });
            });
        };
    }else {
        return {
            type: ERROR
        };
    }
}