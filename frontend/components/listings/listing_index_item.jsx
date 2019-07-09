import React from 'react';
import { Link } from 'react-router-dom';
import SplashListingIndexContainer from './splash_listing_index_container';

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
      </Link>

    </div>

      // {/* <Link to={`/events/${event.id}`}>{event.description}</Link>
      // <Link to={`/events/${event.id}/edit`}>Edit</Link>
      // <button onClick={deleteEvent(event.id)}>Delete</button> */}
    // </li>
  )
};

export default ListingIndexItem;
