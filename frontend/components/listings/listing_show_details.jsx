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
        <p className="show-description" id="show-small">{listing.description}</p>
          
      </div>
      <div className="show-content-right">
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
