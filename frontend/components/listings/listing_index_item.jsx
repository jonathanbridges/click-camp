import React from 'react';
import { Link } from 'react-router-dom';

const ListingIndexItem = ({ listing }) => {

  const imgStyle = {
    backgroundImage: `url(${listing.photoUrls[0]})`,
  };

  return (

    <div className="campground-tile">
      <Link className="tile-link" to={`/discover/${listing.id}`}>

      <div className="tile-picture" style={imgStyle}></div>
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
              <strong>{` ${listing.rating}%`}</strong>
              <span className="recommend-text">{` - ${listing.numberReviews} Reviews`}</span>
            </div>  
          </div>
          <div className="tile-info-right">
            <div className="price">
              <strong>{`$${listing.cost}/night`}</strong>
            </div>
          </div>
        </div>
      </div>
      </Link>

    </div>

  )
};

export default ListingIndexItem;
