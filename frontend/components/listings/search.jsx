import React from 'react';
import DiscoverListingIndexContainer from './discover_listing_index_container';
import ListingMap from './listing_map';

let viewportHeight;

class Search extends React.Component {

  constructor(props) {
    super(props)

  }

  componentDidMount() {
    viewportHeight = $(window).height() - 86;

    document.getElementById("map-wrapper").style.height = `${viewportHeight}px`
  }

  render() {

    return (
      <div className="discover-wrapper">
        <DiscoverListingIndexContainer
          listings = {this.props.listings}
          fetchListings = {this.props.fetchListings}
        />
        <ListingMap 
          listings={this.props.listings}
          updateFilter={this.props.updateFilter}
          mapSearchCoords={this.props.mapSearchCoords}
        />
      </div>
    )
  }


}

export default Search;