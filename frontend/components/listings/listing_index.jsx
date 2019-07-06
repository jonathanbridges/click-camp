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
      <div>
        <ul>
          {listings}
        </ul>
        {/* <Link to={`/events/new`}>New Event</Link> */}
      </div>
    );
  }
}

export default ListingIndex;
