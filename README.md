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

1. Clone and install dependencies:
```bash
git clone https://github.com/jonathanbridges/click-camp
cd click-camp
npm install
bundle install
```

2. System Requirements (for Apple Silicon Macs):
```bash
# Install PostgreSQL 14 (LTS version)
arch -arm64 brew install postgresql@14
arch -arm64 brew services start postgresql@14
arch -arm64 brew link postgresql@14 --force

# Install PostGIS for geospatial features
arch -arm64 brew install postgis
```

For Intel Macs, omit the `arch -arm64` prefix.

3. Database setup:
```bash
# Create and seed the database
rails db:reset
```

4. Start the servers:
```bash
npm start
bundle exec rails server
```

Then navigate to http://localhost:3000/#/

## Technologies Used
### Backend
* Framework: Ruby on Rails (v7.1.5)
* Database: PostgreSQL (v14) with PostGIS for geospatial features
* AWS S3: stores listing photos
* User Authentication: Created using BCrypt
* External APIs: Google Maps API
* Geospatial: PostGIS for location-based searches

### Frontend
* Framework: React/Redux
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
