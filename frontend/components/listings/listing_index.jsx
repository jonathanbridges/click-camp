import React from 'react';
import ListingIndexItem from './listing_index_item';
import { Link } from 'react-router-dom';

class ListingIndex extends React.Component {

  componentDidMount() {
    this.props.fetchListings()
  }
  render() {
    let listings = this.props.listings.map(listing => <ListingIndexItem listing={listing} key={listing.id} />)

    return (
      <div className="index">
        <div className="home-wrapper">
          <h2 className="home-title">Everywhere you want to camp.</h2>
          <div className="home-subtext">
            <big>Book unique camping experiences on over <strong>300,000</strong></big>
            <br/>
            <big>campsites, ranches, vineyards, public parks, and more.</big>
          </div>
        </div>
        <div className="search-wrapper">
          <form className="search-main">
            <div className="listing-search-input">
              {/* <span className=""></span> */}
              <input type="search" name="listings" id="listings" autocomplete="off" spellcheck="false" dir="auto" placeholder="San Francisco" />
            </div>
            <div className="dates-btn">
              <span className="calendar"></span>
              <span className="value">Enter Dates </span>
            </div>
            <div className="categories-btn">
              <span className="tent"></span>
              <span className="value">All camping </span>
              <span className="chevron"></span>
            </div>
            <button className= "search-btn" type="submit">Search</button>
          </form>
        </div>
        <div>
        <ul>
          {listings}
        </ul>
        </div>
      </div>
    );
  }
}

export default ListingIndex;
