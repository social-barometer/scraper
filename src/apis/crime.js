const request = require('request-promise-native')
const apiURL = 'https://data.police.uk/api/crimes-street/all-crime?'


/**
 * Crime object
 *
 * @typedef {Object} crime
 * @property {String} category – Category of crime, f.e. "burglary"
 * @property {String} outcome – The category and date of the latest recorded outcome for the crime
 * @property {Object} location – Info about the location of the crime
 * @property {String} location.street – Name of the street where the crime took place
 * @property {Number} location.lat – Latitude co-ordinates of the place of the crime
 * @property {Number} location.lng – Longitude co-ordinates of the place of the crime
 */

/**
 * Fetch crime stats from a location.
 *
 * @param {Object.<geolocation>} coors – Co-ordinates for the crime stats
 * @param {String} [month] – YYYY-MM, Optionally limit results to a specific month
 * @returns {Object.<crime>}
 */
 module.exports = async (coors, date) => {
  try {
    const resp = await request(
      `${apiURL}lat=${coors.lat}&lng=${coors.lng}${date ? ('&date=' + date) : ''}`
    )
    return JSON.parse(resp)
      .map(x => ({
        category: x.category,
        outcome: x.outcome_status,
        location: {
          lat: x.location.latitude,
          lng: x.location.longitude,
          street: x.location.street.name
        }
      }))
  } catch(e) {
    throw e
  }x
 }