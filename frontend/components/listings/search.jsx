import React from 'react';
import DiscoverListingIndex from './discover_listing_index';
import ListingMap from './listing_map';

class Search extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

    
  }

  render() {
    return (
      <div className="discover-wrapper">
        <DiscoverListingIndex
          listings = {this.props.listings}
          fetchListings = {this.props.fetchListings}
        />
        <ListingMap />
      </div>
    )
  }

}

export default Search;