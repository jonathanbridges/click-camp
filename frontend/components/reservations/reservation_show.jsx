import React from 'react';

export const ReservationShow = ({ reservation, listing }) => {

  const placeHolderStyle = {
    border: `0px`,
  }

  if (!reservation) {
    return (<div style={placeHolderStyle}></div>)
  } else {
    // debugger

    let duration = reservation.check_out.getDate() - reservation.check_in.getDate();
    let subtotal = (reservation.check_out.getDate() - reservation.check_in.getDate()) * listing.cost;
    let serviceFee = ((reservation.check_out.getDate() - reservation.check_in.getDate()) * listing.cost) / 10;

    let imgStyle = {
      backgroundImage: `url(${listing.photoUrls[listing.photoUrls.length - 1]})`,
    }

    return (
      <div className="reservation-deets-wrapper">
        {/* <h2>Reservation Made!</h2> */}
        <div className="reservation-img" style={imgStyle}></div>
        <div className="reservation-title">Reservation Details:</div>
        <div className="reservation-show-deets">
          <ul className="reservation-ul">
            <li>Length of stay: </li>
            <li>Subtotal: </li>
            <li>Service Fee: </li>
            <li className="res-total">Total: </li>
          </ul>
          <ul className="reservation-ul">
            <li>{`${duration} Nights`}</li>
            <li>{`$${subtotal} USD`}</li>
            <li>{`$${serviceFee} USD`}</li>
            <li className="res-total">{`$${subtotal + serviceFee} USD`}</li>
          </ul>
        </div>
      </div>
    );
  }
  
}

export default ReservationShow;
