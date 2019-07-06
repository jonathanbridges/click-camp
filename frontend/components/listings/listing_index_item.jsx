import React from 'react';
import { Link } from 'react-router-dom';
import listing_index_container from './listing_index_container';

const ListingIndexItem = ({ listing }) => {
  // debugger
  return (
    <li>
      {/* <p>{listing.id}</p> */}
      <big>{listing.name}</big>
      <br/>
      <small>{listing.description}</small>
      <img src={listing.photoUrls[0]} />
        {/* <img src={listing.photos[0]} />   */}
      {/* <Link to={`/events/${event.id}`}>{event.description}</Link>
      <Link to={`/events/${event.id}/edit`}>Edit</Link>
      <button onClick={deleteEvent(event.id)}>Delete</button> */}
    </li>
  )
};

export default ListingIndexItem;
