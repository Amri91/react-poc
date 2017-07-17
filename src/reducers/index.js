import { combineReducers } from 'redux';
import RestaurantsList from './restaurant-list';
import ActiveRestaurant from './restaurant-details';
import Error from './error-handler';

/**
 * Root reducer, combines all reducers results
 * @type {Reducer<S>}
 */
const rootReducer = combineReducers({
    restaurants: RestaurantsList,
    selectedRestaurant: ActiveRestaurant,
    error: Error
});

export default rootReducer;
