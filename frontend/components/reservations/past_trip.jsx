import React from 'react';

class PastTrip extends React.Component {
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
            <div className="past-trip">
              <div className="trip-image-wrapper">
                <img src={listing.photoUrls[4]} />
                <div>{listing.name}</div>
              </div>
              <div className="dates">
                {this.props.reservation.check_in}
                {this.props.reservation.check_out}
              </div>
              <p>Cost per night: {listing.cost}</p>
            </div>
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

export default PastTrip;