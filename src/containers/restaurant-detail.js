import React, { Component } from 'react';
import { connect } from 'react-redux';
import Transition from 'react-motion-ui-pack';
import Loader from 'react-loader';
import { Link } from 'react-router-dom';

import { getImageSource, getRatingClass, getRestStatusClass, getRestStatusText, getRestCategoryImage, getDirections } from '../helpers';
import { USER_DEFAULT_IMAGE, AUTH_SERVER, SPINNER_OPTIONS, TRANSITION_OPTIONS, NAVIGATION_ICON } from '../globals';

/**
 * This container handles restaurant details
 */
class RestaurantDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: !!this.props.restaurant
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    /**
     * Form input change handler
     * @param event native event object
     */
    onInputChange(event) {
        this.setState({ review: event.target.value });
    }


    /**
     * On props change, this method will trigger and stop the spinner by updating the state
     * @param {Object} nextProps contains new props
     */
    componentWillReceiveProps(nextProps){
        if(nextProps.restaurant)
            this.setState({ loaded: true });
    }

    /**
     * Form submit handler
     * @param event native event object
     */
    onFormSubmit(event) {
        // We do not want the default behavior, we're implementing our own
        event.preventDefault();

        // encoding after and before btoa to handle special characters
        let state = encodeURIComponent(btoa(encodeURIComponent(JSON.stringify({ text: this.state.review, venueId: this.props.restaurant.venue.id }))));
        this.setState({ review: '' });

        window.location.assign(AUTH_SERVER + '&state=' + state);
    }

    /**
     * Renders the review part of the restaurant details page
     * @param {Object} item contains review information
     * @param {String} item.id review id
     * @param {String} item.text review text
     * @param {Object} item.user contains reviewer information
     * @param {Object} [item.user.photo contains] reviewer photo
     * @param {String} item.user.firstName contains reviewer name
     * @param {String} item.user.photo.prefix photo url prefix
     * @param {String} item.user.photo.suffix photo url suffix
     * @returns {XML} React JSX Object
     */
    renderReview(item) {
        if(item){
            const img = item.user.photo ? `${item.user.photo.prefix}300x300${item.user.photo.suffix}` : USER_DEFAULT_IMAGE;
            return (
                <li key={item.id}>
                    <div className="avatar" style={{backgroundImage: 'url('+img+')' }} />
                    <div className="text">
                        <span className="name">{item.user.firstName}</span>
                        <span className="desc">
                            {item.text}
                        </span>
                    </div>
                </li>
            );
        }
    }

    /**
     * Renders the restaurant details
     * @param {Object} restaurant.venue restaurant details
     * @param {Number} restaurant.venue.rating restaurant rating information
     * @param {Object} [restaurant.venue.hours] restaurant business hours details
     * @param {Object} restaurant.venue.photos.photos restaurants photos information object
     * @param {Array} restaurant.venue.photos.groups a list of restaurant photo information
     * @param {Array} restaurant.venue.categories restaurant type information
     * @param {Object} restaurant.venue.price restaurant pricing information
     * @param {Number} restaurant.venue.price.tier restaurant tier
     * @param {Object} [restaurant.venue.location] restaurant location object
     * @param {String} restaurant.venue.location.formattedAddress restaurant string-formatted address
     * @param {String} restaurant.venue.location.lat latitude
     * @param {String} restaurant.venue.location.lng longitude
     * @param {Object} restaurant.tips restaurant reviews
     * @returns {*} React JSX Object or false
     */
    renderRestaurant(restaurant) {
        if (!restaurant) return false;

        const { venue, tips } = restaurant;

        return (
            <div key="restaurantDetails" className="single-rest-warpper">
                <div className="first-section">
                    <div className="left-side">
                        <div className="rest-logo" style={{backgroundImage: 'url('+getImageSource(venue.photos.groups[0])+')' }} />
                    </div>
                    <div className="right-side">
                        <div className={`rating ${getRatingClass(venue.rating)}`}><span>{venue.rating}</span></div>
                        <h3>
                            {venue.name}
                            <span className={getRestStatusClass(venue.hours)}>{getRestStatusText(venue.hours)}</span> 
                        </h3>
                        <div className="info">
                            <div className="left-info-side">
                                <span className="rest-type">
                                    <span className="type">
                                        {venue.categories.map(item => {
                                            return (
                                                <span key={item.id} className="cat-label">
                                                    {item.name}
                                                    <img className="rest-cat-logo" src={getRestCategoryImage(venue.categories)} />
                                                </span>
                                            );
                                        })}
                                    </span>
                                    <span className="dollars">{venue.price ? '$'.repeat(venue.price.tier) : ''}</span>
                                </span>
                            </div>
                            <div className="right-info-side">
                                {venue.location && <a href={getDirections(venue.location)} className="drive-to"><img src={NAVIGATION_ICON} alt="" /></a>}
                                <span className="address">{venue.location ? venue.location.formattedAddress.join('-') : ''}</span>
                                <span className="distance">{venue.location.distance} feet away from you</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="reviews">
                    <ul>
                        {tips.map(item => this.renderReview(item))}
                    </ul>
                </div>

                <form onSubmit={this.onFormSubmit} className="new-review">
                    <textarea
                        placeholder="Tell others about your experience"
                        value={this.state.review}
                        onChange={this.onInputChange}
                        required
                        minLength={10}
                        maxLength={200}
                    />
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </form>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Loader loaded={this.state.loaded} { ...SPINNER_OPTIONS }  />
                <Transition
                    component={false}
                    { ...TRANSITION_OPTIONS }
                >
                    {this.renderRestaurant(this.props.restaurant)}
                </Transition>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        restaurant: state.selectedRestaurant
    };
}

export default connect(mapStateToProps)(RestaurantDetail);
