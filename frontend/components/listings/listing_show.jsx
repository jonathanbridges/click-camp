import React from 'react';

import ListingShowDetails from './listing_show_details';
import Carousel from 'nuka-carousel';

class ListingShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchListing(this.props.match.params.listingId);
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
      photos = <div className="show-img-container"></div>
      details = ""
    } else {
      photos = this.props.listing.photoUrls.map((photo, idx) => <div className="show-img-container" key={`img-${idx}`}><img src={photo} style={imgStyle} /></div>)
      details = < ListingShowDetails listing = { this.props.listing } />
    }

    return (
      <div className="show-content-wrapper">
        <div className="carousel-wrapper">
          <Carousel slidesToShow={2} >
            {photos}
          </Carousel>
        </div>
        {details}
      </div>
    );
  }
}

export default ListingShow;
