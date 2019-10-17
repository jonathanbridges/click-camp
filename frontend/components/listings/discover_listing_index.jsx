import React from 'react';
import ListingIndexItem from './listing_index_item';
import PulseLoaderAnimation from '../loader/pulse_loader';
import { Link } from 'react-router-dom';

class DiscoverListingIndex extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      listings: this.props.listings,
      noResults: false,
    }


    setTimeout(() => this.setState({loading: false}), 250);
  }

  componentDidMount() {

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

    let { listings, updateSearchCoords } = this.props;

    listings = listings.map(listing => <ListingIndexItem listing={listing} key={listing.id} />)

    if (this.state.noResults === true) {
      return (
        <div className="index-dc-row" id="discover-listings">
          <p>Sorry there is some errors boss</p>
        </div>
      )
    }

    
    if (this.state.loading === true) {
      return (
        <div className='loader'>
          <PulseLoaderAnimation loading={this.state.loading} />
        </div>
      )
    } else {
      return (
        <div className="index-dc-row" id="discover-listings">
          {listings}
        </div>
      );
    }
  }
}

export default DiscoverListingIndex;
