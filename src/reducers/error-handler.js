import { ERROR } from '../actions';
import history from '../helpers/history';
import { ERROR_PAGE } from '../globals';

/**
 * Error handler reducer, will redirect to error page on error
 * @param state
 * @param action
 * @returns {*}
 */
export default function(state = null, action) {
    switch (action.type) {
    case ERROR: {
        history.push(ERROR_PAGE);
        return action.payload;
    }
    }
    return state;
}