# GITHUB-API

## brief

- RESPONSIVE for all screens
- shows my user data and my public repos
- search for users from github
  - toggle search by clicking on search icon in the right top corner.
  - works only for exact match as of now
  - shows their user data and public repos
- github personal access token is used to increase the api rate limit
  - The token is hard coded here. It is risky to use it hardcoded like this. However the access token will expire in 30 days and has only get repos access.
  - solution would be to setup a backend which makes api calls for us to github and we can make calls to our backend without hard coding it in the front end instead.

## js files

- script.js
  - setUp
    - runs on load or on home page icon click
  - setState
    - updates state
  - render
    - takes care of updating dom
- api.js
  - fetchData
    - fetch data using fetch api
  - getUserData
    - get user data and repos
- dom.js
  - has dom functions
  - createUserPageDOM
    - contains user details and repos
  - createUserCardDOM
  - createRepoCardDOM
  - createRepoListDOM
