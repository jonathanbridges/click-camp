import React from 'react';
// import { Link } from 'react-router-dom';
import ListingShowDetails from './listing_show_details';

class ListingShow extends React.Component {

  componentDidMount() {
    this.props.fetchListing(this.props.match.params.listingId)
  }

  render() {

    let photos;
    let details;
    if (this.props.listing === undefined) {
      photos = <li>nothing</li>;
      details = "loading"
    } else {
      photos = this.props.listing.photoUrls.map((photo, idx) => <li key={idx}><img src={photo} /></li>)
      details = < ListingShowDetails listing = { this.props.listing } />
    }

    return (
      <div>
        <div>{photos}</div>
        <div>{details}</div>
      </div>
    );
  }
}

export default ListingShow;
