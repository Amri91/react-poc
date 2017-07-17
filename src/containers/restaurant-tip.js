import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Transition from 'react-motion-ui-pack';

import { handleFoursquareRedirect } from '../actions';
import { TRANSITION_OPTIONS } from '../globals';

/**
 * To avoid magic strings
 * @type {{PENDING: string, SUCCESS: string}}
 */
const STATUSES = {
    PENDING: 'pending',
    SUCCESS: 'success'
};

/**
 * This container handles submitting a tip/review to a restaurant
 */
class RestaurantTip extends Component {
    constructor(props) {
        super(props);

        this.state = { status: STATUSES.PENDING };
        this.successHandler = this.successHandler.bind(this);
    }

    /**
     * The entry point, will redirect to foursquare
     */
    componentWillMount(){
        this.props.handleFoursquareRedirect(this.successHandler);
    }

    /**
     * Callback to handle the success view
     */
    successHandler() {
        this.setState({ status: STATUSES.SUCCESS });
    }


    /**
     * Will render a block with text inside depending on the status
     * @returns {XML}
     */
    renderNotice(){
        let comp;
        if(this.state.status === STATUSES.PENDING){
            comp = <span>Sending review...</span>;
        }else if(this.state.status === STATUSES.SUCCESS){
            comp = <span>The review has been submitted, thanks!</span>;
        }
        return <div key="tipResult" className="notice">{comp}</div>;
    }

    render() {
        return (
            <Transition
                component={false}
                { ...TRANSITION_OPTIONS }
                className="list-group col-sm-4"
            >
                {this.renderNotice()}
            </Transition>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ handleFoursquareRedirect }, dispatch);
}

export default connect(null, mapDispatchToProps)(RestaurantTip);