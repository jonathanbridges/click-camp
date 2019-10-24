import React from 'react';
import { Link } from 'react-router-dom';

import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';

import ReservationShow from '../reservations/reservation_show'
import ReviewIndexContainer from '../reviews/review_index_container';

let overlay;
let cal;
let calOffset;
let reserved;

class ListingShowDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      camper_id: this.props.currentUser === undefined ? null : this.props.currentUser.id,
      startDate: null,
      endDate: null,
      focusedInput: null,
      reservation: null,
      focused: false,
      errors: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.focusReservation = this.focusReservation.bind(this);
    this.unfocusReservation = this.unfocusReservation.bind(this);

    this.validate = this.validate.bind(this);
  }

  componentWillMount() {
    reserved = false;
  }

  componentDidMount() {
    this.props.fetchReviews();
       // retrieves reservations for current user
    if (this.state.camper_id !== null) {
      this.props.fetchReservationsByUserId(this.props.currentUser.id);
    }

    // Allows calendar to become sticky when scrolled to
    if (
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype
    ) {
      let observer = new IntersectionObserver(entries => {
        if (entries[0].boundingClientRect.y < 500) {
          document.body.classList.add("cal-not-at-top");
        } else {
          document.body.classList.remove("cal-not-at-top");
        }
      });
      observer.observe(document.querySelector("#top-of-site-pixel-anchor"));
    }
  }
  
  componentDidUpdate(prevProps) {
    // Adds user id to state if user didn't log in until visiting listing page
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setState({
        camper_id: this.props.currentUser.id
      });
      // retrieves reservations for current user
      this.props.fetchReservationsByUserId(this.state.camper_id);
    }
  }

  focusReservation() {
    // show overlay when user clicks in reservation details
    if (this.state.focused === false) {
      overlay = document.querySelector('#listing-overlay');
      overlay.style.display = 'block';

    // helper function to find position of calendar box
      const offset = (el) => {
        var rect = el.getBoundingClientRect(),
          scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
      }

      cal = document.getElementById('login-wrapper');
      calOffset = offset(cal);
      
      // scroll to calendar on focus
      window.scrollTo({
        top: calOffset.top - 100,
        left: 0,
        behavior: 'smooth'
      });

      this.setState({
        focused: true
      });
    }
  }

  unfocusReservation() {
    // removes overlay if user clicks out of calendar
    if (this.state.focused === true) {
      overlay = document.querySelector('#listing-overlay');
      overlay.style.display = 'none';

      this.setState({
        focused: false
      });
    }
  }

  validate() {
    const errors = [];

    if (this.state.startDate === null) {
      errors.push("Select a Start Date");
    }
    if (this.state.endDate === null) {
      errors.push("Select an End Date");
    }
    
    return errors;
  }

  handleSubmit(e) {
    e.preventDefault();

    // Populates form with errors if there are any
    const errors = this.validate();
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    // if ((this.state.startDate === null || this.state.endDate === null) && this.props.currentUser !== undefined) {
    //   alert("Please select valid check in and check out dates.")
    //   return
    // }

    let formattedReservation = {
      camper_id: this.state.camper_id,
      listing_id: this.props.listing.id,
      check_in: this.state.startDate._d,
      check_out: this.state.endDate._d,
      listing_photo: this.props.listing.photoUrls[2],
      listing_cost: this.props.listing.cost,
      listing_name: this.props.listing.name
    }

    this.props.receiveCheckoutInfo(formattedReservation);
    this.props.openModal('checkout');
  }

  render () {

    let reviews;
    if (this.props.reviews.length > 0) {
      reviews = <ReviewIndexContainer
        listing={this.props.listing}
        currentUser={this.props.currentUser}
      />
    } else {
      reviews = <div></div>
    }

    // determines if the current user already has a reservation scheduled for the listing
    let futureReservation;
 
    if ((this.props.reservations.length > 0) && (this.props.currentUser !== undefined)) {
      this.props.reservations.forEach(reservation => {
        if ((reservation.listing_id === this.props.listing.id) && (reservation.camper_id === this.props.currentUser.id)) {

          // if date is in the future and not a past listing
          let now = new Date()
          let todayDay = now.getUTCDate();
          if (now.getDate() < todayDay){
            todayDay = now.getDate();
          }
          let todayMonth = now.getUTCMonth();
          let todayYear = now.getUTCFullYear();

          let checkIn = new Date(reservation.check_in);
          let checkInDay = checkIn.getUTCDate();
          let checkInMonth = checkIn.getUTCMonth();
          let checkInYear = checkIn.getUTCFullYear();

          if (checkInDay >= todayDay) {
            if (checkInMonth >= todayMonth && checkInYear >= todayYear) {
              reserved = true;
              futureReservation = reservation;
            }
          } else if (checkInDay < todayDay) {
            if ((checkInYear > todayYear) || (checkInMonth > todayMonth && checkInYear >= todayYear)) {
              reserved = true;
              futureReservation = reservation;
            }
          }
        }
      });
    }

    // Once valid start and end dates have been set, appends subtotal and prompt to page
    let subtotalDiv;
    let promptDiv;
    let sub;

    if (this.state.endDate && this.state.startDate) {
      
      let checkIn = this.state.startDate._d.getTime();
      let checkOut = this.state.endDate._d.getTime();
      let duration = (checkOut - checkIn) / (1000 * 3600 * 24);

      sub = duration * this.props.listing.cost;

      subtotalDiv = (
        <div className="subtotal-wrapper">
          <p>Subtotal</p>
          <p>{`$${sub}`}</p>
        </div>
      )

      promptDiv = (
        <div className="prompt">
          <p>Don't worry, you won't be charged yet.</p>
        </div>
      )
    } else {
      subtotalDiv = (<div></div>)
      promptDiv = (<div></div>)
    }

    let checkInFormatted;
    let checkOutFormatted;
    if (reserved === true) {

      var photo = this.props.listing.photoUrls[this.props.listing.photoUrls.length - 1];

      let checkIn = new Date(futureReservation.check_in);
      let checkOut = new Date(futureReservation.check_out);

      let duration = (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24);

      sub = duration * this.props.listing.cost;

      // date formatting
      const suffix = (n) => { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th" }
      const dateFormatting = { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};

      checkInFormatted = `${checkIn.toLocaleDateString('en-EN', dateFormatting)}${suffix(checkIn.getDate())}`;
      checkOutFormatted = `${checkOut.toLocaleDateString('en-EN', dateFormatting)}${suffix(checkOut.getDate())}`;
    }


    let calendar;

    if (this.props.currentUser === undefined) {
      // render checkout component for logged out users
      let errors = this.state.errors;
      calendar = (
        <div id="login-wrapper btn-main" onClick={() => this.props.openModal('login')}>
          <div id="top-of-site-pixel-anchor"></div>
          <div className="calendar-wrapper">
            <div id="listing-overlay"></div>
            <div className="price-row">
              <strong className="day-rate">{`$${this.props.listing.cost}`}</strong>
              <p className="price-deets">per night</p>
            </div>
            <DateRangePicker
              numberOfMonths={1}
              minimumNights={2}
              enableOutsideDays={true}
              startDateId="startDate"
              endDateId="endDate"
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate }) }}
              focusedInput={this.state.focusedInput}
              onFocusChange={(focusedInput) => { this.setState({ focusedInput }) }}
            />
            <a onClick={this.handleSubmit} className="btn-main checkout-btn" id="show-book">Log in to Book</a>
          </div>
        </div>
      )
    } else {
      // render checkout component for logged in users with a future reservation
      let errors = this.state.errors;
      if (reserved === true) {
        calendar = (
          <div className="login-wrapper">
            <div id="top-of-site-pixel-anchor"></div>
            <div className="calendar-wrapper no-cursor">
              <div className="site-row">
                <strong>Your trip to:</strong>
                <p>{this.props.listing.name}</p>
              </div>
              <div>
                <img className="reservation-photo" src={photo} />
              </div>
              <div className="subtotal-wrapper">
                <p>Total</p>
                <p>{`$${(sub*1.16).toFixed(2)}`}</p>
              </div>
              <div className="reservation-dates">
                <div className="reservation-checkin">
                  <p>Check In:</p>
                  <p>{checkInFormatted}</p>
                </div>
                <div className="reservation-checkout">
                  <p>Check Out:</p>
                  <p>{checkOutFormatted}</p>
                </div>
              </div>
              <Link className="btn-main" to={`/trips`}>Manage Reservation</Link>
            </div>
          </div>
        )
      } else {
        // render checkout for logged in users without a reservation
        let errors = this.state.errors;
        calendar = (
          <div id="login-wrapper" onClick={this.focusReservation}>
            {/* 1px anchor for sticky calendar section */}
            <div id="top-of-site-pixel-anchor"></div>
            <div id="listing-overlay" onClick={this.unfocusReservation}></div>
            <div className="calendar-wrapper">
              <div className="price-row">
                <strong className="day-rate">{`$${this.props.listing.cost}`}</strong>
                <p className="price-deets">per night</p>
              </div>
              <DateRangePicker
                numberOfMonths={1}
                minimumNights={2}
                enableOutsideDays={true}
                startDateId="startDate"
                endDateId="endDate"
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onDatesChange={({ startDate, endDate }) => { 
                  if (startDate === null) return;
                  this.setState({ startDate, endDate, errors: []}) 
                }}
                focusedInput={this.state.focusedInput}
                onFocusChange={(focusedInput) => { this.setState({ focusedInput }) }}
              />
              {errors.map(error => (
                <p className="calendar-error" key={error}>{error}</p>
              ))}
              {subtotalDiv}
              <a onClick={this.handleSubmit} className="btn-main checkout-btn" id="show-book"><i className="fas fa-bolt"></i>&nbsp;&nbsp;Instant Book</a>
              {promptDiv}
            </div>
          </div>
        )
      }
    }
  
  return (
    <div className="show-content-bottom">
      <div className="show-content-left">
        <div>
          <div className="show-name">
            <h1>{this.props.listing.name}</h1>
            <div className="verified">
              <i className="fas fa-check"></i>  
            </div>
          </div>
        </div>
        <div className="tile-recommend">
          <i className="fas fa-thumbs-up"></i>
          <strong>{` ${this.props.listing.rating}%`}</strong>
          <span className="recommend-text"><strong className="strong-verified"> Recommend</strong>{` - ${this.props.listing.numberReviews} Reviews`}</span>
        </div>

        {/* Host Information */}
        <div className="show-host-desc">
          <img className="host-ava" src={`${this.props.listing.hostPhotoUrl}`} alt=""/>
          <div className="host-details">
            <p className="hosted-by">Hosted by</p>
            <p className="host-name">{this.props.listing.hostName}</p>
          </div>
          <p className="show-description" id="show-small">{this.props.listing.description}</p>
        </div>

        {/* Info Cards */}
        <section className = "show-info-section">
          <div className="info-wrapper">

            {/* Card 1 */}
            <div className="info">
              <h2 className="show-title">Campsite area</h2>
              <div className="info-deets">
                <i className="fas fa-campground"></i>
                <p>Bring your own tents</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-map-marker-alt"></i>
                <p>1 site</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-users"></i>
                <p>8 guests</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-walking"></i>
                <p>Short walk</p>
              </div>
              <div className="info-deets">
                <i className="fab fa-accessible-icon"></i>
                <p>ADA access</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="info">
              <h2 className="show-title">Essentials</h2>
              <div className="info-deets">
                <i className="fas fa-fire-alt"></i>
                <p>Campfires allowed</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-dog"></i>
                <p>Pets allowed</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-toilet-paper"></i>
                <p>Toilet available</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-shower"></i>
                <p>Shower available</p>
              </div>
            </div>
          
            {/* Card 3 */}
            <div className="info">
              <h2 className="show-title">Activities</h2>
              <div className="info-deets">
                <i className="fas fa-biking"></i>
                <p>Mountain biking</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-swimmer"></i>
                <p>Swimming</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-hiking"></i>
                <p>Hiking</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-quidditch"></i>
                <p>Quidditch</p>
              </div>
              <div className="info-deets">
                <i className="fas fa-volleyball-ball"></i>
                <p>Volleyball</p>
              </div>
            </div>
          </div>
        </section>

        {/* Details */}
        <div className="details-row">
          <div>
            <label>Details</label>
          </div>
          <div>
            <ul className="show-ul">
              <li><strong className="show-strong">Check in:</strong> After 2PM</li>
              <li><strong className="show-strong">Check out:</strong> Before 12PM</li>
              <li><strong className="show-strong">Cancellation Policy:</strong> Flexible</li>
            </ul>
          </div>
          <div>
            <ul className="show-ul">
              <li><strong className="show-strong">On arrival:</strong> Meet and greet</li>
              <li><strong className="show-strong">Minimum nights:</strong> 2 nights</li>
              <li><strong className="show-strong">Accepts Bookings:</strong> 12 months out</li>
            </ul>
          </div>
        </div>
        {reviews}
      </div>

      {/* Reservation Section */}
      <div className="listing-reservation-wrapper">
        <div className="show-content-right" id="pending">
          {calendar}
        </div>
        {/* Reservation after booking */}
        <div className="reservation-new">
          <ReservationShow reservation={this.state.reservation} listing={this.props.listing} />
        </div>
      </div>

     

    </div>
    )
  };
}

export default ListingShowDetails;
