# Rick and Morty character viewer

You can view the live demo version at [https://rickandmorty.ajaybalachandran.com](https://rickandmorty.ajaybalachandran.com/)

## Features
- Calls the Rick and Morty API to fetch the character information
- Fetches the location and episode information (Mouse over to view truncated titles)
- Integration and unit tests for all the components (Except App.jsx...too lazy 🤭)

## Further improvement scope
- Can cache the same API endpoints. For eg. if the same character appears in multiple episodes, requests are sent for the same data multiple times. API has cache headers set to avoid any delay, but if the same episode is there for multiple characters in the first page, unnecessary requests are sent.
- Can implement infinite loading or page numbers in the pagination for better user experience
- Maybe a better UI instead of boring Material UI 😁



## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\

