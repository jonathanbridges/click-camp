import React from 'react';
import { Link } from 'react-router-dom';

import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';

import ReservationShow from '../reservations/reservation_show'

class ListingShowDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      camper_id: this.props.currentUser === undefined ? null : this.props.currentUser.id,
      startDate: null,
      endDate: null,
      focusedInput: null,
      reservation: null,
    };

    debugger
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    
  }

  handleSubmit(e) {
    e.preventDefault();
    let formattedReservation = {
      camper_id: this.state.camper_id,
      listing_id: this.props.listing.id,
      check_in: this.state.startDate._d,
      check_out: this.state.endDate._d,
    }

    // alert(`You're about to book ${this.state.endDate._d.getDate() - this.state.startDate._d.getDate()} days!  `)
    this.props.createReservation(formattedReservation)
      .then(this.setState({
        startDate: null,
        endDate: null,
        focusedInput: null,
        reservation: formattedReservation
      }))
      .then(document.getElementById("pending").innerHTML = "You're confirmed!")
      .then(document.getElementById("pending").setAttribute("id", "confirmed")
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setState({camper_id: this.props.currentUser.id});
    }
  }

  render () {

    let calendar;
    if (this.props.currentUser === undefined) {
      calendar = (
        <div id="login-wrapper btn-main" onClick={() => this.props.openModal('login')}>
          <h2> Please log in to book</h2>
          <div className="calendar-wrapper">
            <DateRangePicker
              startDateId="startDate"
              endDateId="endDate"
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate }) }}
              focusedInput={this.state.focusedInput}
              onFocusChange={(focusedInput) => { this.setState({ focusedInput }) }}
            />
          <a onClick={this.handleSubmit} className="btn-main" id="show-book">Instant Book</a>
          </div>
        </div>
      )
    } else {
      calendar = (
        <div className="calendar-wrapper">
          <DateRangePicker
            startDateId="startDate"
            endDateId="endDate"
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate }) }}
            focusedInput={this.state.focusedInput}
            onFocusChange={(focusedInput) => { this.setState({ focusedInput }) }}
          />
          <a onClick={this.handleSubmit} className="btn-main" id="show-book">Instant Book</a>
        </div>
      )
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
          <strong>{` ${Math.floor(Math.random() * (1 + 100 - 85)) + 85}%`}</strong>
          <span className="recommend-text"><strong className="strong-verified"> Recommend</strong>{` - ${Math.floor(Math.random() * (1 + 200 - 12)) + 12} Reviews`}</span>
        </div>

        {/* Host Information */}
        <div className="show-host-desc">
          <img className="host-ava" src="https://app-name-seeds.s3-us-west-1.amazonaws.com/host1.jpg" alt=""/>
          <div className="host-details">
            <p className="hosted-by">Hosted by</p>
            <p className="host-name">Myrna H.</p>
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
              <li><strong className="show-strong">Minimum nights:</strong> 1 night</li>
              <li><strong className="show-strong">Accepts Bookings:</strong> 12 months out</li>
            </ul>
          </div>
        </div>
          
      </div>

      {/* Reservation Section */}
      <div className="listing-reservation-wrapper">
        <div className="show-content-right" id="pending">
          <div className="show-price">
            <strong>{`${this.props.listing.cost}/night`}</strong>
          </div> 
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
