import { GET_RESTAURANTS, RESTAURANT_SELECTED } from '../actions';

/**
 * Restaurant list reducer
 * @param state
 * @param action
 * @returns {Array}
 */
export default function(state = [], action) {
    switch(action.type){
    case GET_RESTAURANTS: {
        return action.payload.data;
    }

    case RESTAURANT_SELECTED:
        return [];
    }
    return state;
}
