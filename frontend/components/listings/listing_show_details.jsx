import React from 'react';
import { Link } from 'react-router-dom';

const ListingShowDetails = ({ listing }) => {

  debugger
  return (

    <div className="campground-tile">
      {/* <div className="tile-picture" style={imgStyle}></div> */}
      <div className="tile-details">
        <div className="tile-name">
          <big>{listing.name}</big>
        </div>
        <div className="tile-description">
          <small className="desc-color">{listing.description}</small>
        </div>
        <div className="tile-info">
          <div className="tile-info-left">
            <div className="tile-recommend">
              <i className="fas fa-thumbs-up"></i>
              <strong>{` ${Math.floor(Math.random() * (1 + 100 - 85)) + 85}%`}</strong>
              <span className="recommend-text">{` - ${Math.floor(Math.random() * (1 + 200 - 12)) + 12} Reviews`}</span>
            </div>
          </div>
          <div className="tile-info-right">
            <div className="price">
              <strong>{`$${listing.cost}/night`}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ListingShowDetails;
