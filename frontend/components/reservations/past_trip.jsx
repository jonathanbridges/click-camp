import React from 'react';
import { Link } from 'react-router-dom';

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
          let checkIn = new Date(this.props.reservation.check_in);
          let checkOut = new Date(this.props.reservation.check_out);

          let duration = (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24);

          let nights;
          if (duration < 2) {
            nights = '1 night'
          } else {
            nights = `${duration} nights`
          }

          // date formatting
          const suffix = (n) => { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th" }
          const dateFormatting = { weekday: 'long', month: 'short', day: 'numeric' };

          let checkInFormatted = `${checkIn.toLocaleDateString('en-EN', dateFormatting)}${suffix(checkIn.getDate())}`;
          let checkOutFormatted = `${checkOut.toLocaleDateString('en-EN', dateFormatting)}${suffix(checkOut.getDate())}`;

          trip = (
            <div className="past-trip">
                <div className="trip-image-wrapper">
                  <Link to={`/discover/${listing.id}`}>        
                    <div className="trip-listing-name">>{listing.name}</div>
                    <img className="trip-img" src={listing.photoUrls[5]} />
                  </Link>
                </div>

                <div className="trip-bottom">
                  <div className="trip-details">
                    <div className="trip-dates">
                      <p>{`${checkInFormatted} to ${checkOutFormatted}`}</p>
                    </div>
                    <div className="gray-text">
                      <p>{`${nights} at $${listing.cost}/night`}</p>
                    </div>
                    
                  </div>

                  {/* Add review button once reviews implemented */}
                  {/* <button className="btn-main">Leave Review</button> */}

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

export default PastTrip;