import React from 'react';
import { Link } from 'react-router-dom';

const ListingShowDetails = ({ listing }) => {

  return (
    <div className="show-content-bottom">
      <div className="show-content-left">
        <div>
          <div className="show-name">
            <h1>{listing.name}</h1>
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
          <p className="show-description" id="show-small">{listing.description}</p>
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
      <div className="show-content-right" id="stick-here">
        <div className="show-price">
          <strong>{`$${listing.cost}/night`}</strong>
        </div> 
        <div className="show-dates">
          <div className="start-date">
            <div className="show-bold">Check In</div>
            <span>Select Date</span>
          </div>
          <div className="end-date">
            <div className="show-bold">Check Out</div>
            <span>Select Date</span>
          </div>
        </div>
        <a className="btn-main" id="show-book">Instant Book</a>
      </div>
    </div>
  )
};

export default ListingShowDetails;
