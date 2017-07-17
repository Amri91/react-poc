import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { HOME_PAGE } from '../globals';

/**
 * Header component
 */
export default class Header extends Component {
    render() {
        return (
            <div className="logoAndSlogan">
                <Link to={HOME_PAGE} className="home-page-link">
                    <span className="r">R</span>ound The Corner
                </Link>
            </div>
        );
    }
}