import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectRestaurant, getNearbyRestaurants } from '../actions';
import { bindActionCreators } from 'redux';
import Transition from 'react-motion-ui-pack';
import Loader from 'react-loader';

import { getImageSource, getRatingClass, getRestStatusClass, getRestStatusText, getRestCategoryImage } from '../helpers';
import { RESTAURANT_DETAILS_PAGE, SPINNER_OPTIONS, TRANSITION_OPTIONS } from '../globals';
import history from '../helpers/history';

class RestaurantList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    componentWillMount(){
        this.props.getNearbyRestaurants();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.restaurants && nextProps.restaurants.length !== 0)
            this.setState({loaded: true});
    }

    handleClick(restaurant) {
        this.props.selectRestaurant(restaurant);
        history.push(RESTAURANT_DETAILS_PAGE);
    }

    renderList() {
        return this.props.restaurants.map(restaurant => {
            const { venue } = restaurant;

            return (
                <li
                    key={venue.id}
                    onClick={() => this.handleClick(restaurant)}
                    className="clearfix"
                >
                    <div className={`rating ${getRatingClass(venue.rating)}`}>
                        <span>{venue.rating ? venue.rating : '-'}</span>
                    </div>
                    <div className="left-side">
                        <div className="rest-logo" style={{backgroundImage: 'url('+getImageSource(venue.photos.groups[0])+')' }} />
                    </div>
                    <div className="right-side">
                        <h3>
                            {venue.name}
                            <span className={getRestStatusClass(venue.hours)}>{getRestStatusText(venue.hours)}</span> 
                        </h3>
                        <div className="info">
                            <div className="left-info-side">
                                <span className="rest-type">
                                    {venue.categories.map(item => {
                                        return (
                                            <span key={item.id} className="cat-label">
                                                {item.name}
                                                <img className="rest-cat-logo" src={getRestCategoryImage(venue.categories)} />
                                            </span>
                                        );
                                    })}
                                    <span className="dollars">{venue.price ? '$'.repeat(venue.price.tier) : ''}</span>
                                </span>
                            </div>
                            <div className="right-info-side">
                                <span className="address">{venue.location ? venue.location.formattedAddress.join('-') : ''}</span>
                                <span className="distance">{venue.location.distance} feet away from you</span>
                            </div>
                        </div>
                    </div>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <Loader loaded={this.state.loaded} { ...SPINNER_OPTIONS } />
                <Transition
                    component='ul'
                    { ...TRANSITION_OPTIONS }
                    className='rest-list'
                >
                    {this.renderList()}
                </Transition>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        restaurants: state.restaurants
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectRestaurant, getNearbyRestaurants }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);