import React from 'react';
import PulseLoaderAnimation from '../loader/pulse_loader';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // kick off booking timer after loader resolves
    const fiveMinutes = (5 * 60) - 1;
    const display = document.querySelector('.checkout-timer');
    setTimeout(() => this.setState({ loading: false }), 250);
    setTimeout(() => this.startTimer(fiveMinutes, display), 275);
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
        document.querySelector(".checkout-timer").innerHTML = "EXPIRED";
      }
    }, 1000);
  }

  handleSubmit(e) {
    e.preventDefault();

    let formattedReservation = {
      camper_id: this.props.reservationParams.camper_id,
      listing_id: this.props.reservationParams.listing_id,
      check_in: this.props.reservationParams.check_in,
      check_out: this.props.reservationParams.check_out
    }
    
    // Start loader, create reservation, close modal, trigger refresh in ListingShowDetails
    this.setState({loading: true})
    setTimeout(() => this.props.createReservation(formattedReservation)
      .then(this.props.closeModal()
      ), 1000
    )
    
  }

  render() {

    if (this.state.loading === true) {
      return (
        <div className='loader'>
          <PulseLoaderAnimation loading={this.state.loading} />
        </div>
      );
    }

    let photo = (
      <img src={`${this.props.reservationParams.listing_photo}`} />
    )
    // date formatting
    const suffix = (n) => { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th" }
    const dateFormatting = { weekday: 'short', month: 'short', day: 'numeric' };

    let checkIn = this.props.reservationParams.check_in;
    let checkOut = this.props.reservationParams.check_out;

    let checkInFormatted = `${checkIn.toLocaleDateString('en-EN', dateFormatting)}${suffix(checkIn)}`;
    let checkOutFormatted = `${checkOut.toLocaleDateString('en-EN', dateFormatting)}${suffix(checkOut)}`;

    // price getting
    let duration = (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24);

    let subtotal = duration * this.props.reservationParams.listing_cost;
    let serviceFee = (subtotal * .1);
    let occupancyTaxes = (subtotal * .06);
    let total = (subtotal + serviceFee + occupancyTaxes).toFixed(2);

    return (
      <div className="checkout-modal-wrapper">

        <div className="checkout-header">
          <div className="checkout-header-left">
            <img className="clickcamp-text-modal" src="https://app-name-seeds.s3-us-west-1.amazonaws.com/clickcamp-text.png" alt=""></img>
            <span className="icon fa fa-lock"></span>
            <p className="gray-text">Secure Checkout</p>
          </div>
          <div className="checkout-header-right">
            <p>Time left to</p>
            <p>finish booking</p>
            <p className="checkout-timer">05:00</p>
          </div>
        </div>

        <div className="checkout-rulebook">
          <h1>Rulebook</h1>
          <ul className="checkout-rulebook-wrapper">
            <li className="checkout-rulebook-item">
              <div className="checkout-badge">
                <i className="fas fa-check"></i>
              </div>
              <span><i className="fas fa-fire-alt"></i></span>
              <div className="checkout-rulebook-text">
                <p className="checkout-regular-text">Campfires are allowed at this listing.</p>
                <p className="checkout-gray-text">We are located in a fire protection class ten area. Fires are allowed inside the fire ring at the site only, and no wood warming fires will be permitted during high fire season.</p>
              </div>
            </li>
            <li className="checkout-rulebook-item">
              <div className="checkout-badge">
                <i className="fas fa-check"></i>
              </div>
              <span><i className="fas fa-cat"></i></span>
              <div className="checkout-rulebook-text">
                <p className="checkout-regular-text">Pets are allowed at this listing. (On leash)</p>
                <p className="checkout-gray-text">This is a working farm and we have small prey animals and a livestock guardian dog up at the farmhouse here so we require permission to bring any dogs to the site. They must stay by your side at all times, or on a leash if you leave the campsite and pets may not come up to the ranch/farmhouse.</p>
              </div>
            </li>
            <li className="checkout-rulebook-item">
              <div className="checkout-badge na">
                <i className="fas fa-times"></i>
              </div>
              <span><i className="fas fa-tint-slash"></i></span>
              <div className="checkout-rulebook-text">
                <p className="checkout-regular-text">Potable drinking water is not available at this listing. (Bring your own water, Purify from river or stream, Purify from spigot, Purify from pump, Purify from lake or pond)</p>
                <p className="checkout-gray-text">We don't have a water system in yet so we provide campers with a gallon of bottled water each day for drinking and cooking and you can bring your equipment to boil/purify river water or water from the old fashioned hand pump too.</p>
              </div>
            </li>
            <li className="checkout-rulebook-item">
              <div className="checkout-badge">
                <i className="fas fa-check"></i>
              </div>
              <span><i className="fas fa-trash-alt"></i></span>
              <div className="checkout-rulebook-text">
                <p className="checkout-regular-text">Waste disposal is available at this listing. (Recycling bin, Trash bin)</p>
                <p className="checkout-gray-text">We are in black bear country. Please keep food items secure. There is a trash can on site. We will check it daily.</p>
              </div>
            </li>
            <li className="checkout-rulebook-item">
              <div className="checkout-badge na">
                <i className="fas fa-times"></i>
              </div>
              <span><i className="fas fa-utensils"></i></span>
              <div className="checkout-rulebook-text">
                <p className="checkout-regular-text">Kitchen and cooking equipment are not available</p>
                <p className="checkout-gray-text">There is a BBQ with a single burner.</p>
              </div>
            </li>
            <li className="checkout-rulebook-item">
              <div className="checkout-badge">
                <i className="fas fa-check"></i>
              </div>
              <span><i className="fas fa-toilet-paper"></i></span>
              <div className="checkout-rulebook-text">
                <p className="checkout-regular-text">A toilet is available at this listing. (Pit toilet)</p>
                <p className="checkout-gray-text">New outhouse installed in 2019.</p>
              </div>
            </li>
           
          </ul>

          <div className="checkout-deets">
            <div className="checkout-deets-header">
              {photo}
              <div className="checkout-deets-header-text">
                <div className="checkout-deets-header-text-left">
                  <p>Your trip to:</p>
                  <p className="font-variant">{this.props.reservationParams.listing_name}</p>
                </div>
                <div className="checkout-deets-header-text-left">
                  <p>Site:</p>
                  <p>Dispersed</p>
                </div>
                <div className="checkout-deets-header-text-left">
                  <p>{checkInFormatted} to</p>
                  <p>{checkOutFormatted}</p>
                </div>
              </div>
            </div>
            
            <div className="checkout-summary">
              <div className="checkout-sub">
                <div className="checkout-summary-item">
                  <p>Subtotal</p>
                  <p>{`$${subtotal.toFixed(2)}`}</p>
                </div>
                <div className="checkout-summary-item">
                  <p>Service fee</p>
                  <p>{`$${serviceFee.toFixed(2)}`}</p>
                </div>
                <div className="checkout-summary-item">
                  <p>Occupancy taxes</p>
                  <p>{`$${occupancyTaxes.toFixed(2)}`}</p>
                </div>
              </div>
              <div className="checkout-summary-item">
                <p className="total">Total</p>
                <p className="total">{`$${total}`}</p>
              </div>
              <button className="btn-main checkout-submit" onClick={this.handleSubmit}>
                <p></p>
                <p>Agree and book</p>
                <i className="icon fa fa-lock"></i>
              </button>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

export default Checkout;