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
            <div className="future-trip">

              <div className="trip-image-wrapper">
                <div className="trip-listing-name">{listing.name}</div>
                <img className="trip-img" src={listing.photoUrls[3]} />
              </div>

              <div className="trip-dates">
                {this.props.reservation.check_in}
                {this.props.reservation.check_out}
              </div>

              <div className="trip-cost">
                <p>Cost per night: {listing.cost}</p>
              </div>

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

export default FutureTrip;