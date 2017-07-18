/**
 * Created by amri on 7/14/17.
 */
// The CLIENT_SECRET is somewhere safe ;)
export const CLIENT_ID = '2GGJHKFQTBZAMYSBOVN0CRNJ0OEKC2XCESRAZOXNN10NQ0Y4';
export const USER_DEFAULT_IMAGE = '/userDefaultImage.png';
export const RESTAURANT_DEFAULT_IMAGE = '/restaurantDefaultImage.png';
export const NAVIGATION_ICON = '/navigationIcon.svg';
export const WEBSITE_URL = 'https://d22ahu1y45ifjf.cloudfront.net/';

// PAGES
export const RESTAURANT_DETAILS_PAGE = '/restaurantDetails';
export const RESTAURANT_LIST_PAGE = '/restaurantList';
export const HOME_PAGE = '/';
export const REDIRECT_PAGE = '/redirect';
export const ERROR_PAGE = '/error';

export const AUTH_SERVER = `https://foursquare.com/oauth2/authenticate?client_id=${CLIENT_ID}
&response_type=token&redirect_uri=${encodeURIComponent(`${WEBSITE_URL}#${REDIRECT_PAGE}`)}`;

export const SPINNER_OPTIONS = {
    color: '#fff',
    position: 'fixed'
};

export const TRANSITION_OPTIONS = {
    enter: { opacity: 1 },
    leave: { opacity: 0 }
};