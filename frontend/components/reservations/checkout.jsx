import React from 'react';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const fiveMinutes = (5 * 60) - 1;
    const display = document.querySelector('.checkout-timer');
    this.startTimer(fiveMinutes, display);
  }

  startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    const countdown = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = 0;
        clearInterval(countdown)
        // document.querySelector(".checkout-timer").innerHTML = "EXPIRED";
      }
    }, 1000);
  }

  render() {
    // debugger;

    // var photo = this.props.listing.photoUrls[this.props.listing.photoUrls.length - 1];

    // let checkIn = new Date(futureReservation.check_in);
    // let checkOut = new Date(futureReservation.check_out);

    // let duration = (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24);

    // sub = duration * this.props.listing.cost;

    // // date formatting
    // const suffix = (n) => { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th" }
    // const dateFormatting = { weekday: 'long', month: 'long', day: 'numeric' };

    // var checkInFormatted = `${checkIn.toLocaleDateString('en-EN', dateFormatting)}${suffix(checkIn.getDate())}`;
    // var checkOutFormatted = `${checkOut.toLocaleDateString('en-EN', dateFormatting)}${suffix(checkOut.getDate())}`

    // subtotalDiv = (
    //   <div className="subtotal-wrapper">
    //     <p>Subtotal</p>
    //     <p>{`$${sub}`}</p>
    //   </div>
    // )

    return (
      <div className="checkout-modal-wrapper">
        <div className="checkout-header">
          <div className="checkout-header-left">
            <span className="icon fa fa-lock"></span>
            <p className="gray-text">Secure Checkout</p>
          </div>
          <div className="checkout-header-right">
            <p>Time left to finish booking</p>
            <p className="checkout-timer">05:00</p>
          </div>
        </div>




        <h2>This is the checkout modal</h2>
      </div>
    )
  }
}

export default Checkout;