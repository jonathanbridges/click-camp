import React from 'react';
import ListingIndexItem from './listing_index_item';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import PulseLoaderAnimation from '../loader/pulse_loader';
import SearchBarContainer from '../searchbar/searchbar_container';

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

    let testimonialListingId;
    let trendingSites = [];
    let listings = this.props.listings.map(listing => {
      if (listing.name === "Leaning Leanto") {
        testimonialListingId = listing.id;
      }
      trendingSites.push(
        <li className="trending-campground-list-item" key={listing.id}>
          <Link to={`/discover/${listing.id}`}>{listing.name}</Link>
        </li>
      )
      return (
        <ListingIndexItem listing={listing} key={listing.id} />
      )
    });

    return (
      // Header Section
      <div className="index">
        <div className="home-wrapper">
          <h2 className="home-title">Find yourself outside.</h2>
          <div className="home-subtext">
            <h3>Book unique camping experiences on over <strong>300,000</strong></h3>
            <h3>campsites, ranches, vineyards, public parks, and more.</h3>
          </div>  
        </div>

        {/* Featured Sites Section  */}
        <h2 className="discover-subtext">Featured Campsites:</h2>
        <div className="featured-camping">
          <div className="featured-site">
            {listings[0]}
            <div className="featured-span"><i className="fas fa-arrow-up"></i>High Demand</div>
          </div>
          <div className="featured-site">
            {listings[5]}
            <div className="featured-span"><span>🔥</span>Campfire favorite</div>
          </div>
          <div className="featured-site">
            {listings[7]}
            <div className="featured-span"><i className="fas fa-bolt"></i>Instant Book</div>
          </div>
        </div>

        <div className="featured-border-wrapper">
          <div className="featured-border"></div>
        </div>

        {/* Testimonial Section */}
        <section className="splash-testimonial">
          <div className="testimonial-container">
            <div className="testimonial-content">
              <figure className="testimonial-image-container">
                <img alt="Hipcamp host Terry" className="testimonial-image" src="https://app-name-seeds.s3-us-west-1.amazonaws.com/testimonial.jpg" />
              </figure>
              <div className="quotes-wrapper">
                <h1>Terry, ClickCamp Host says:</h1>
                <blockquote>
                  “Hipcamp has helped us earn some much needed side income to supplement our working ranch. Hipcamp staff are all very helpful and approachable, and they always respond to our inquiries immediately. We are big fans of this service and we can't recommend it highly enough to other landowners like ourselves!”
                </blockquote>
                <Link to={`/discover/${testimonialListingId}`} className="testimonial-host-link">Host of Leaning Leanto in California</Link>
                <div className="testimonial-cta">
                  <Link to="/discover" className="btn-main testimonial-discover-btn">Discover Camping</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="what">
          <div className="what-container">
            <figure className="what-images-container">
              <img alt="Empowering Hosts" className="what-image" src="https://app-name-seeds.s3-us-west-1.amazonaws.com/what-tentarms.svg" />
            </figure>
            <h2>ClickCamp empowers people to share their land with campers.</h2>
            <figure className="what-images-container">
              <img alt="Sustainable" className="what-image" src="https://app-name-seeds.s3-us-west-1.amazonaws.com/what-moneyhands.svg" />
            </figure>
            <h2>Creating sustainable revenue and fostering community.</h2>
            <figure className="what-images-container">
              <img alt="Unlocking Access" className="what-image what-image-last" src="https://app-name-seeds.s3-us-west-1.amazonaws.com/what-handkey.svg" />
            </figure>
            <h2>Unlocking access to incredible new places to camp.</h2>
          </div>
        </section>

        {/* Trending Campsites Section */}
        <section className="trending-sites">
          <div className="trending-container">
            <h2>Trending campgrounds</h2>
            <div className="trending-list-container">
              <ul className="trending-campgrounds-list">
                {trendingSites.slice(0,3)}
              </ul>
              <ul className="trending-campgrounds-list">
                {trendingSites.slice(3,6)}
              </ul>
              <ul className="trending-campgrounds-list">
                {trendingSites.slice(6,9)}
              </ul>
              <ul className="trending-campgrounds-list">
                {trendingSites.slice(9)}
              </ul>
            </div>
          </div> 
        </section>

        {/* Search Bar */}
        <div className="searchbar-container">
          <SearchBarContainer />
        </div>

        <Footer />
      </div>
    );
  }
}

export default SplashListingIndex;
