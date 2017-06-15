# Node Watson Discovery Service Server

This is a prototype node server to connect with the Watson Discovery Public News API.

## Getting started

In order to get this program up and running you will need to do several things. First in the command line within the directory type

"npm install"

Then add a .env file and add you credentials from Bluemix

This Application uses a mongo database to store sentiment data from watson

In order to make this program run you must have mongodb installed and running before you can run this application.

The name of the local database collection should be watsonapi after you have the application running and have posted a entry.

"node server.js" or use "nodemon" in the root

Go to localhost:3000 in the browser

## Making API Calls

This API has two RESTful routes set up; GET (all), POST (one).

Make a POST call to the deployed API at https://genesiswatson.herokuapp.com/ with a company as a string and a count as a number and you get a new record with the sentiment score returned from Watson with the company and count results.
Sample return

"{
_id: "5941cbf73e90d20004b7f701",
score: 0.011065000000000005,
count: 2,
company: "Google",
__v: 0
}"

Make a GET call to the deployed API at https://genesiswatson.herokuapp.com/ to return all the records in the database. Sample return

"{ allSentiments: [
    {
    _id: "5941c9672f7ee60004416e25",
    score: 0.125482,
    count: 1,
    company: "Mircosoft",
    __v: 0
    },
    {
    _id: "5941cbf73e90d20004b7f701",
    score: 0.011065000000000005,
    count: 2,
    company: "Google",
    __v: 0
    },
    {
    _id: "5941cc013e90d20004b7f702",
    score: 0.011065000000000005,
    count: 3,
    company: "IBM",
    __v: 0
    },
    {
    _id: "5941cc0d3e90d20004b7f703",
    score: 0.009537546666666669,
    count: 4,
    company: "Tesla",
    __v: 0
    },
    {
    _id: "5941cc143e90d20004b7f704",
    score: 0.10086616000000001,
    count: 5,
    company: "Boeing",
    __v: 0
    }
  ]"


  ## Deployment

  This API is hosted by heroku and can be found at https://genesiswatson.herokuapp.com/.
