import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * This component handles APP errors
 */
class ErrorHandler extends Component {
    render() {
        return (
            <div className="Error">
                <div key="error" className="notice">
                    <p>Ops. This is embarrassing :(</p>
                    <br />
                    <p>{this.props.error.message}</p>
                </div>;
            </div>
        );
    }
}

/**
 * Maping state errors to props
 * @param {Object} state
 * @returns {{error}} state
 */
function mapStateToProps(state) {
    return {
        error: state.error
    };
}

export default connect(mapStateToProps)(ErrorHandler);