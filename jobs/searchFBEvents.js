const facebook = require('../apis/facebook')

/**
 * Search facebook events and save to DB
 *
 * @param {Object} job – Agenda job
 */
module.exports = async (job) => {
  const { token, keyword } = job.attrs.data
  try {
    const events = await facebook.searchEvents(token, keyword)
    console.log(events)
    // TODO: Save to database
  } catch(err) {
    console.error(err)
  }
}