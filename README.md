# smartcar_backend_coding_challenge
The Generic Motors (GM) car company has a terrible API. Smartcar needs to adapt the API into a cleaner format.

## How to run this repository
This repository is run off of node version 8.9.4 LTS.

Fork this repository, and in the root folder create a `.env` file
with a specified PORT. For example: 

```
PORT=3000
```

Be sure to install and check to make sure that the version of node that is 
run is 8.9.4. The `npm start` script does work on the newest version of node, and
the server the current time does run on node 9.4.0. Only, nodemon development
dependency is not supported by the newest version of node. In the command line,
you can run `node -v` to check.
If node is already installed, and the version is greater than 8.9.4.,
you can update your version by running `nvm install 8.9.4`. A 
notification should appear that notifies that version being used is 8.9.4

Node comes prepackaged with node package manager.

From the command line run the following commands
```
npm install
npm start
```

In the browser or via Postman, you can check the routes.  Documentation of 
valid routes are found [here](https://documenter.getpostman.com/view/2423531/smartcar_backend_challenge/7Lt6KwP)

## File Structure

The layout of this repository is as follows

```
{ root folder }
-- { server }
---- { controllers }
-------- { vehicles }
------------ batteryRange.js
------------ engineAction.js
------------ fuelRange.js
------------ security.js 
------------ vehicleInfo.js
---- { helpers }
------- fetchGMData.js
---- { routes }
------- index.js --> // main router
------- vehicles.js
---- index.js --> // the server
-- { specs } --> unit test folder

```

Unit tests have been created to cover the main functionality of the 
controllers and helpers 
```
{ specs }
---- { __mocks__ } 
---- { controllers }
-------- { vehicles }
------------ batteryRange.js
------------ engineAction.js
------------ fuelRange.js
------------ security.js 
------------ vehicleInfo.js
---- { helpers }
------- fetchGMData.js
```

## Unit Tests
To run the unit tests for this repository in the command line run
```
npm test
```
Unit tests are built using Jest, and uses a mock fetch to the GM API. This is done in order to limit
the amount of network requests made during development.

