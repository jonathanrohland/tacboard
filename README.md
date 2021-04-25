# Tacboard - Frontend

This project is a React-based single-page-app that provides a playing board for the boardgame [TAC](https://spieltac.de).

The Frontend is intended to run against a Websocket-Server as described in the [tacboard-backend repository](https://github.com/jonathanrohland/tacboard-backend).


## Functionality

The application only simulates the board and marbles for the TAC-game. The application was developed during the Corona-Crisis to facilitate playing TAC remotely via video-conferencing tools. Each party should own a separate set of cards for a fluent playing experience. Exchange of cards can be handled using messenger-apps and post-its to note the new value of swapped cards.

The game synchronises the state of the game via websocket-messages. There is no persistence of state on the server, when the last client closes the application the state is lost.

Game-states can be retrieved under a user-defined identifier and are cleared after one week.


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn deploy`
Pushes the content of the build-folder to an S3-bucket which should be configured for static website hosting.

## Bootstrapping

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).