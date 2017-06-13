'use strict';

// Instructions on how to get credentials
// (same steps for all Watson Developer Cloud services):
// http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/getting_started/gs-credentials.shtml
require('dotenv').config()

module.exports = {
    discovery: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        version: 'v1',
        version_date: '2017-04-27'
    }
};
