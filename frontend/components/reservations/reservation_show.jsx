import React from 'react';

export const ReservationShow = ({ reservation }) => {

//  debugger
debugger
  if (!reservation) {
    return (<h1>No reservation yet</h1>)
  } else {
    return (
      <div>
        <h1>A reservation has been made</h1>
      </div>
    );
  }
  

  // return (
  //   <h1>this is from reservation_show</h1>
  // )
}

export default ReservationShow;
