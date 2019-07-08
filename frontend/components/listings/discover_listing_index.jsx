import React from 'react';
import ListingIndexItem from './listing_index_item';
import { Link } from 'react-router-dom';

class DisoverListingIndex extends React.Component {

  componentDidMount() {
    this.props.fetchListings()

    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 }, // this is SF
      zoom: 13,
      mapTypeControl: false,
      rotateControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeId: 'terrain'
    };

    this.map = new google.maps.Map(this.mapNode, mapOptions);
  }

  render() {
    let listings = this.props.listings.map(listing => <ListingIndexItem listing={listing} key={listing.id} />)

    return (
      <div className="index">
        {/* Search Bar */}
        <div className="search-wrapper" id="discover-search">
          <form className="search-main">
            <div className="listing-search-input">
              <span className="input-i">
                <i className="fas fa-search"></i>
              </span>
              <input type="search" name="listings" id="listings" autoComplete="off" spellCheck="false" dir="auto" placeholder="San Francisco" />
            </div>
            <div className="dates-btn">
              <span className="input-i">
                <i className="far fa-calendar"></i>
              </span>
              <span className="value">Enter Dates </span>
            </div>
            <div className="categories-btn">
              <span className="input-i">
                <i className="fas fa-campground"></i>
              </span>
              <span className="value">All camping</span>
              <span className="input-i-chev">
                <i className="fas fa-chevron-down"></i>
              </span>
            </div>
            <button className="search-btn" type="submit">Search</button>
          </form>
        </div>
        <div className="discover-content-wrapper">
          {/* Campgrounds  */}
          <div className="campgrounds-wrapper">
            <section className="index-discover-campgrounds" id="discover-campgrounds">
              <div className="index-dc-row" id="campsites-idx">
                {listings}
              </div>
            </section>
          </div>
          {/* Map */}
          <div ref={map => this.mapNode = map} className="discover-map"></div>
        </div>
      </div>
    );
  }
}

export default DisoverListingIndex;
