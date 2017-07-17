import { RESTAURANT_SELECTED } from '../actions';

/**
 * Restaurant details reducer
 * @param state
 * @param action
 * @returns {*}
 */
export default function(state = null, action) {
    switch (action.type) {
    case RESTAURANT_SELECTED:
        return action.payload;
    }
    return state;
}