# LinkIt

[Live demo on Heroku](http://linkit.herokuapp.com/)

A URL shortener that produces not-so-short URLs. Shorter domain name never.

Written as part of [Free Code Camp's](https://www.freecodecamp.com/) Back End Development curriculum.

## User Stories

1.  I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2.  If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
3.  When I visit that shortened URL, it will redirect me to my original link.

## Languages / Technologies used
- Node.js
- Express
- PostgreSQL
- HTML
- JavaScript + jQuery
- Gulp

## Installation instructions
```
Clone repo
npm install
npm run build
npm start
```

## NPM scripts
```
npm start       # Start application
npm run dev     # Start application using nodemon
npm run build   # Compile assets
npm run watch   # Compile assets and watch for changes
```

## Usage
- Either navigate to main page and enter URL via form
- Or
  1. Send post request to `/api/urls` with `url` parameter
  2. Example response
  ```
  {
    "original": "http://linkit.herokuapp.com/",
    "shortened": "http://localhost:3000/297f4bb"
  }
  ```

* * *

Written as part of [Free Code Camp's](http://www.freecodecamp.com/) Back End Development curriculum.
