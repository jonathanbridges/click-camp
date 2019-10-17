import React from 'react';
import ListingIndexItem from './listing_index_item';
import PulseLoaderAnimation from '../loader/pulse_loader';
import { Link } from 'react-router-dom';

class DiscoverListingIndex extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }

    setTimeout(() => this.setState({loading: false}), 250);
  }

  componentDidMount() {
    // this.props.fetchListings();
  }

  render() {
    let { listings, updateSearchCoords } = this.props;

    if (this.state.loading === true) {
      return (
        <div className='loader'>
          <PulseLoaderAnimation loading={this.state.loading} />
        </div>
      )
    }

    listings = listings.map(listing => <ListingIndexItem listing={listing} key={listing.id} />)

    return (
      <div className="index-dc-row" id="discover-listings">
        {listings}
      </div>
    );
  }
}

export default DiscoverListingIndex;
