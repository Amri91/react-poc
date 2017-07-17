import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Route, Switch, HashRouter } from 'react-router-dom';

import reducers from './reducers';
import RestaurantTip from './containers/restaurant-tip';
import RestaurantList from './containers/restaurant-list';
import RestaurantDetail from './containers/restaurant-detail';
import HomePage from './containers/home-page';
import Header from './components/header';
import ErrorHandler from './components/error-handler';
import { RESTAURANT_DETAILS_PAGE, RESTAURANT_LIST_PAGE, HOME_PAGE, REDIRECT_PAGE, ERROR_PAGE } from './globals';
import history from './helpers/history';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <HashRouter history={history}>
            <div>
                <Header />
                <Switch>
                    <Route exact path={RESTAURANT_LIST_PAGE} component={RestaurantList} />
                    <Route exact path={RESTAURANT_DETAILS_PAGE} component={RestaurantDetail} />
                    <Route exact path={ERROR_PAGE} component={ErrorHandler} />
                    <Route path={REDIRECT_PAGE} component={RestaurantTip} />
                    <Route exact path={HOME_PAGE} component={HomePage} />
                </Switch>
            </div>
        </HashRouter>
    </Provider>,
    document.querySelector('.container')
);
