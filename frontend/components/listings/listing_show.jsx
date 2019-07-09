import React from 'react';
// import { Link } from 'react-router-dom';
import ListingShowDetails from './listing_show_details';
import Carousel from 'nuka-carousel';

class ListingShow extends React.Component {

  componentDidMount() {
    this.props.fetchListing(this.props.match.params.listingId)
  }

  render() {

    const imgStyle = {
      height: `480px`,
      width: `100%`,
      objectFit: `cover`
    };

    let photos;
    let details;
    if (this.props.listing === undefined) {
      photos = <li>nothing</li>;
      details = "loading"
    } else {
      photos = this.props.listing.photoUrls.map((photo, idx) => <div className="show-img-container" key={`img-${idx}`}><img src={photo} style={imgStyle} /></div>)
      details = < ListingShowDetails listing = { this.props.listing } />
    }

    return (
      <div className="show-content-wrapper">
        <div></div>
        <div className="carousel-wrapper">
          <Carousel slidesToShow={2} >
            {photos}
          </Carousel>
        </div>
        <div></div>
        {/* <div>{details}</div> */}
      </div>
    );
  }
}

export default ListingShow;
