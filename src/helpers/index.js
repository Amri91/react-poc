import {RESTAURANT_DEFAULT_IMAGE} from '../globals';

/**
 * Returns an image source for a restaurant
 * @param {Object} [imageGroup]
 * @param {Array} imageGroup.items list of images in the image group
 * @returns {string}
 */
export function getImageSource(imageGroup) {
    return imageGroup ? `${imageGroup.items[0].prefix}${imageGroup.items[0].height}x${imageGroup.items[0].width}${imageGroup.items[0].suffix}` : RESTAURANT_DEFAULT_IMAGE;
}

/**
 * Returns rating class based on the number provided
 * @param {Number} rating restaurant rating
 * @returns {String}
 */
export function getRatingClass(rating){
    if(rating >= 8)
        return 'green';
    else if(rating >= 7)
        return 'yellow';
    else return 'red';
}

/**
 * Returns the class name of the restaurant current status
 * @param {Object} [hours] restaurant hours object
 * @param {Boolean} hours.isOpen restaurant status
 * @returns {String}
 */
export function getRestStatusClass(hours){
    if(hours && hours.isOpen) return 'isOpen';
    else if(hours && !hours.isOpen ) return 'isClosed';
    else return 'hidden';
}

/**
 * Returns the text to be displayed based on restaurant status
 * @param {Object} [hours] restaurant hours object
 * @param {Boolean} hours.isOpen restaurant status
 * @returns {String}
 */
export function getRestStatusText(hours){
    return hours ? (hours.isOpen ? 'OPEN' : 'CLOSED') : '';
}

/**
 * Returns the most relevant category image
 * @param {Array} categories restaurant categories array
 */
export function getRestCategoryImage(categories){
    const icon = categories[0].icon;
    return `${icon.prefix}44${icon.suffix}`;
}

/**
 *
 * @param {Object} location location object
 * @param {String} location.lat latitude
 * @param {String} location.lng longitude
 * @returns {string}
 */
export function getDirections(location){
    return `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
}