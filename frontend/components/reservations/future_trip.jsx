import React from 'react';

class FutureTrip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let trip = (
      <div></div>
    );

    if (this.props.listings.length > 0) {

      // loop through listings and find the one associated with the reservation
      this.props.listings.map(listing => {

        if (listing.id === this.props.listingId) {
          trip = (
            <div>{listing.name}</div>
          )
        }
      }, this);
    }

    return (
      <div>
        {trip}
      </div>
    )
  }
}

export default FutureTrip;