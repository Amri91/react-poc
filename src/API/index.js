import axios from 'axios';

const ROOT_URL = 'https://api.backendless.com/93F000C3-54D7-A2C7-FFDB-A54F98605D00/E4F1F4C0-55E6-8237-FF53-8BA4491B8C00/services/MyService/';

export const API = {
    /**
     * GET
     * API call to get the restaurants
     * @param {Object} _ unnamed object
     * @param {Object} _.coords object that holds the coordinates
     * @param {Number} _.coords.latitude latitude
     * @param {Number} _.coords.longitude longitude
     * @returns {AxiosPromise}
     */
    getRestaurants: ({ coords: { latitude, longitude } }) => {
        const url = `${ROOT_URL}getRestaurants?latitude=${latitude}&longitude=${longitude}`;
        return axios.get(url);
    },

    /**
     * GET
     * API call to get a surprise restaurant
     * @param {Object} _ unnamed object
     * @param {Object} _.coords object that holds the coordinates
     * @param {Number} _.coords.latitude latitude
     * @param {Number} _.coords.longitude longitude
     * @returns {AxiosPromise}
     */
    getASurpriseRestaurant: ({ coords: { latitude, longitude } }) => {
        const url = `${ROOT_URL}surpriseMe?latitude=${latitude}&longitude=${longitude}`;
        return axios.get(url);
    },

    /**
     * POST
     * API call to post a review
     * @param {Object} _ unnamed object
     * @param {Object} _.text review text
     * @param {Number} _.venueId restaruant to review
     * @param {Number} _.oauthToken user's access token
     * @returns {AxiosPromise}
     */
    postComment: ({ text, venueId, oauthToken }) => {
        const url = `${ROOT_URL}postComment`;
        return axios.post(url, {
            text,
            venueId,
            oauthToken
        });
    }
};