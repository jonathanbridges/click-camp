import React from 'react';
import ListingIndexItem from './listing_index_item';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import PulseLoaderAnimation from '../loader/pulse_loader';

class SplashListingIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }

    setTimeout(() => this.setState({ loading: false }), 500);
  }

  componentDidMount() {
    this.props.fetchListings()
  }
  
  render() {

    if (this.state.loading) {
      return (
        <div className='loader'>
          <PulseLoaderAnimation loading={this.state.loading} />
        </div>
      );
    }

    let listings = this.props.listings.map(listing => <ListingIndexItem listing={listing} key={listing.id} />)

    return (
      <div className="index">
        <div className="home-wrapper">
          <h2 className="home-title">Find yourself outside.</h2>
          <div className="home-subtext">
            <big>Book unique camping experiences on over <strong>300,000</strong></big>
            <br/>
            <big>campsites, ranches, vineyards, public parks, and more.</big>
          </div>
        </div>

        {/* Removing Search Bar until Feature is Implemented :/ */}
        {/* Search Bar */}
        {/* <div className="search-wrapper">
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
            <Link to={`/discover`}>
              <button className= "search-btn" type="submit">Search</button>
            </Link>
          </form>
        </div> */}
        <div className="campgrounds-wrapper">

        {/* Campsite Previews  */}
        <section className="index-discover-campgrounds">
          <big className="discover-subtext">Discover Camping...</big>
          <div className="index-dc-row">
            {listings}
          </div>

        </section>
        </div>

        <Footer />
      </div>
    );
  }
}

export default SplashListingIndex;
