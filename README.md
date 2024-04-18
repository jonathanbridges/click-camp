![Logo](https://app-name-seeds.s3-us-west-1.amazonaws.com/clickcamp-text.png)

## Overview
ClickCamp is a single-page web app inspired by [HipCamp](https://www.hipcamp.com/). Current functionality handles user authentication, the ability to view listings, and make reservations.

The technology stack used utilizes React with Redux for the frontend, and Rails with PostgreSQL for the backend.
## Contents
* [Install](#install)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Planned Features](#planned-features)

## Install
To run ClickCamp locally:
```
$ git clone https://github.com/jonathanbridges/click-camp
$ cd click-camp
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

## Features
### Listings
<img src="./app/assets/images/Listings.gif" align="center"/>

* The landing and discover pages reveal listings for visitors, have a standard navbar and footer, and a search-bar. The discover page adds Google Maps.
* When viewing an individual listing visitors are presented with a carousel of photos, amenities, and host information.
* Listings also allows for reservations to be made.
---
### Reservations
<img src="./app/assets/images/Reservations.gif" align="center"/>

* Visitors can make a reservation on any listing by selecting dates on the right-hand side of the page.
* A confirmation is presented to the visitor upon successfully making a reservation.
---
### Reviews
* Visitors can create, view, update, and delete, reviews for campsites.
---
### Search
* Visitors can search for campground listings via the search bar on the homepage, or when viewing a listing, in the navbar.
---
## Planned Features
* More Search Options (keyword, category) 
