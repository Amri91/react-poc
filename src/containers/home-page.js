import React, { Component } from 'react';
import { connect } from 'react-redux';
import Transition from 'react-motion-ui-pack';
import { bindActionCreators } from 'redux';

import { RESTAURANT_LIST_PAGE, RESTAURANT_DETAILS_PAGE, TRANSITION_OPTIONS } from '../globals';
import { getASurpriseRestaurant } from '../actions';
import history from '../helpers/history';

/**
 * Home page container handles the home page
 */
class HomePage extends Component {
    constructor(props) {
        super(props);

        this.handleSurpriseMeClick = this.handleSurpriseMeClick.bind(this);
    }

    /**
     * Surprise me button handler
     * It redirects to the details page
     */
    handleSurpriseMeClick() {
        this.props.getASurpriseRestaurant();
        history.push(RESTAURANT_DETAILS_PAGE);
    }

    /**
     * Nearby restaurants button handler
     * It redirects to the list page
     */
    handleGetNearbyRestaurantsClick() {
        history.push(RESTAURANT_LIST_PAGE);
    }

    render() {
        return (
            <Transition
                component={false}
                { ...TRANSITION_OPTIONS }
                className="list-group col-sm-4"
            >
                <div className="btns-flex-warpper" key="buttonsAtHomePage">
                    <div className="warpper">
                        <button
                            onClick={this.handleGetNearbyRestaurantsClick}
                            className="btn btn-default">Nearby restaurants</button>
                        <hr />
                        <button
                            className="btn btn-default"
                            onClick={this.handleSurpriseMeClick}>Surprise me!</button>
                    </div>
                </div>
            </Transition>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getASurpriseRestaurant }, dispatch);
}

export default connect(null, mapDispatchToProps)(HomePage);
