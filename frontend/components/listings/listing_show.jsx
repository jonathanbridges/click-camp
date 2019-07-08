import React from 'react';
// import { Link } from 'react-router-dom';

class ListingShow extends React.Component {

  componentDidMount() {
    debugger
    this.props.fetchListing(this.props.match.params.listingId)
  }

  render() {


    return (
      <h2>This is working</h2>
      
      // <div>
      //   <h1>{this.props.listing.name}</h1>
      //   <h2>{this.props.listing.description}</h2>
      //   <h2>{this.props.listing.cost}</h2>
      //   {/* <Link to='/discover'>Index</Link> */}
      // </div>
    );
  }
}

export default ListingShow;
