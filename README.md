## Overview
ClickCamp is a single-page web app inspired by [HipCamp](https://www.hipcamp.com/). Current functionality handles user authentication, the ability to view listings, and make reservations.

Planned future functionality includes implementing search (by keyword, category, and Google Maps API) and the ability to add, update, and delete reviews for listings.

Live Site: [ClickCamp](https://click-camp.herokuapp.com/#/)
The technology stack used utilizes React.js with Redux for frontend, and Rails with PostgreSQL.
## Contents
* [Install](#install)
* [Technologies Used](#technologies-used)
## Install
To run ClickCamp locally:
```
$ git clone https://github.com/jonathanbridges/click-camp
$ cd hipster_habitat
$ npm install
$ bundle install
```

Database creation and initialization:
```
$ bundle exec rails db:setup
```

Deployment instructions:
```
$ npm start
$ bundle exec rails server
$ navigate to http://localhost:3000/#/
```
## Technologies Used
### Backend
* Framework: Ruby on Rails (v5.2.3)
* Database: PostgreSQL (v11.4)
* AWS S3: stores listing photos
* User Authentication: Created using BCrypt (v3.1.7)
* External APIs: Google Maps API

### Frontend
* Framework: React/Redux (v16.8.6/4.0.1)
* React Libraries Used: react-dates (calendar), nuka-carousel (image carousel)
* Styling: CSS

