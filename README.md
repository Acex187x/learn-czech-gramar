# Učíme se pády

This app is a part of Project Glossary which is now in development.

Actual version of the app is hosted on [project-glossary-dev.web.app](https://project-glossary-dev.web.app)

## Starting app locally
`npm start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

## Firebase config
There is all necessary configs to read Project Glossary's Firestore with czech words.
If you want to deploy this app to your firestore project (dont make it please 😭) you can run

`npm run deploy`

It will build a production build and deploy app to project which is listed in `.firebaserc` file (of course you need to be authorized with your firebase account and have `firebase-cli` installed).
