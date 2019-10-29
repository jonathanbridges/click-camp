import React from 'react';
import ListingIndexItem from './listing_index_item';
import PulseLoaderAnimation from '../loader/pulse_loader';
import { Link } from 'react-router-dom';

class DiscoverListingIndex extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      noResults: false,
    }

    setTimeout(() => this.setState({loading: false}), 250);
  }

  componentDidUpdate(prevProps, prevState) {
    // Renders Error Message if no Listings are Found Within Map
    if (prevProps.listings.length > 0 && this.props.listings.length === 0) {
      this.setState({ noResults: true });
    } else if (prevProps.listings.length === 0 && this.props.listings.length > 0) {
      this.setState({ noResults: false });
    }
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div className='loader'>
          <PulseLoaderAnimation loading={this.state.loading} />
        </div>
      )
    }
    
    if (this.state.noResults === true) {
      return (
        <div className="index-dc-row four-oh-four" id="discover-listings">
          <div className="alert-no-results">
            <p>Hmmm, we couldn't find any listings that match your search criteria.</p>
            <br />
            <p>Try a search for San Francisco, or zoom the map out to search again. 🔍</p>
          </div>
          <div className="map-search-bar"></div>
        </div>
      )
    }

    let { listings, updateSearchCoords } = this.props;
    listings = listings.map(listing => <ListingIndexItem listing={listing} key={listing.id} />)
    
    return (
      <div className="index-dc-row" id="discover-listings">
        {listings}
      </div>
    );
  }
}

export default DiscoverListingIndex;
