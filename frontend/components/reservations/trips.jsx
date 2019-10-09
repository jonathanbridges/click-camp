import React from 'react';
import Footer from '../footer/footer';
import PulseLoaderAnimation from '../loader/pulse_loader';
import FutureTrip from './future_trip';
import PastTrip from './past_trip';


class Trips extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      actionReceived: null,
    }

    setTimeout(() => this.setState({ loading: false }), 500);
    this.deleteReservation = this.deleteReservation.bind(this);
  }

  componentDidMount () {
    window.scrollTo(0,0);

    this.props.fetchListings();
    this.props.fetchReservationsByUserId(this.props.currentUser.id);
  
    // Allows for sticky left panel
    if (this.state.loading === false) {
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
  }

  componentDidUpdate(prevProps, prevState) {
    // renders loader upon reservation cancellation
    if (this.props !== prevProps) {
      this.setState({loading: true});
      setTimeout(() => this.setState({loading: false}), 500)
    }
  }

  deleteReservation(reservationId) {
    // deletes reservation then fetches reservations to trigger re-render
    this.props.deleteReservation(reservationId)
      .then(() => this.props.fetchReservationsByUserId(this.props.currentUser.id));
  }

  render() {

    if (this.state.loading === true) {
      return (
        <div className='loader'>
          <PulseLoaderAnimation loading={this.state.loading} />
        </div>
      );
    } 

    let pastReservations = [];
    let futureReservations = [];

    if (this.props.reservations.length > 0 && this.props.currentUser) {

      // loop through user's reservations and sort them into past and future
      this.props.reservations.forEach(reservation => {

        if (reservation.camper_id === this.props.currentUser.id) {
          let now = new Date()
          let todayDay = now.getUTCDate();
          let todayMonth = now.getUTCMonth();
          let todayYear = now.getUTCFullYear();

          let checkIn = new Date(reservation.check_in);
          let checkInDay = checkIn.getUTCDate();
          let checkInMonth = checkIn.getUTCMonth();
          let checkInYear = checkIn.getUTCFullYear();

          if ((checkInDay >= todayDay) && (checkInMonth >= todayMonth) && (checkInYear >= todayYear)) {
            futureReservations.push(
              <FutureTrip
                listingId={reservation.listing_id}
                listings={this.props.listings}
                reservation={reservation}
                deleteReservation={this.deleteReservation}
                key={reservation.id}
              />
            )
          } else {
            pastReservations.push(
              <PastTrip
                listingId={reservation.listing_id}
                listings={this.props.listings}
                reservation={reservation}
                key={reservation.id}
              />
            )
          }
        }
      }, this);
    }

    if (futureReservations.length === 0) {
      futureReservations = (
        <p className="no-trips">No planned trips. Let's get you outside!</p>
      )
    }

    if (pastReservations.length === 0) {
      pastReservations = (
        <p className="no-trips">No trip history.</p>
      )
    }

    return (
      <div className="trips-whole-page">
        <div className="trips-container">
          
          <div className="trips-left-panel" id="trips-left-panel">
            <div id="top-of-site-pixel-anchor"></div>
            <div id="trip-sticky">
              <div className="bio-panel">
                <div className="bio-panel-header">
                  <img className="bio-img" src="https://app-name-seeds.s3-us-west-1.amazonaws.com/campicon.png" alt=""></img>
                  <div className="bio-username"><h2>{this.props.currentUser.username}</h2></div>
                </div>
                <div className="basic-info"><span className="icon icon-heart fa fa-heart"></span> Camping since July 2019</div>
                <div className="basic-info"><span className="icon fa fa-map-marker"></span> San Francisco</div>
                <div className="basic-info tagline"><span className="gray-text">Intro: </span>The woods are lovely, dark and deep. But I have fire, here for heat. And behold smores! It's time to eat.</div>
              </div>
              <div className="verified-panel">
                <div className="verified-panel-text">
                  <p className="gray-text">Trusted Account</p>
                  <p><span className="icon check-icon fa fa-check-circle-o"></span>Email address</p>
                  <p><span className="icon check-icon fa fa-check-circle-o"></span>Facebook</p>
                </div>
              </div>
            </div>
          </div>
          <div className="trips-right-panel">
            <h2>Your Upcoming Trips:</h2>
            <div className="future-trips-wrapper">
              {futureReservations}
            </div>
            <h2>Your Past Trips:</h2>
            <div className="past-trips-wrapper">
              {pastReservations}
            </div>
          </div>

        </div>
        <Footer />
      </div>
    )
  }
}

export default Trips;