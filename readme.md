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

Make changes to the "company: "microsoft" " line 33 in the the server function app.locals.call starting on line 29 to see different company results and the else statement to see different results of the response by drilling into the response object.

Alternatively use the watson.js file and connect the company as a variable and the return to a express local export to a controller function to use in a embedded view or distributed front end. If you want to develop using this approach you also need to load your .env file into these controller functions.
