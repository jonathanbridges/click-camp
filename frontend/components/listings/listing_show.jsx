import React from 'react';

import ListingShowDetails from './listing_show_details';
// import ReviewsIndex from '../reviews/reviews_index';
import Footer from '../footer/footer';
import Carousel from 'nuka-carousel';
import PulseLoaderAnimation from '../loader/pulse_loader';

class ListingShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      loading: true
    };


    setTimeout(() => this.setState({ loading: false }), 500);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchListing(this.props.match.params.listingId);
  }

  render() {

    if (this.state.loading) {
      return (
        <div className='loader'>
          <PulseLoaderAnimation loading={this.state.loading} />
        </div>
      );
    }

    const imgStyle = {
      height: `480px`,
      width: `100%`,
      objectFit: `cover`
    };

    let photos, details;

    if (this.props.listing === undefined) {
      photos = <div className="show-img-container"></div>
      details = ""
    } else {
      photos = this.props.listing.photoUrls.map((photo, idx) => <div className="show-img-container" key={`img-${idx}`}><img src={photo} style={imgStyle} /></div>)
      
      details = < ListingShowDetails 
        listing={this.props.listing}
        reviews={this.props.reviews}
        receiveCheckoutInfo={this.props.receiveCheckoutInfo}
        currentUser={this.props.currentUser}
        openModal={this.props.openModal}
        fetchReservationsByUserId={this.props.fetchReservationsByUserId} 
        reservations={this.props.reservations}
        fetchReviews={this.props.fetchReviews}
      />
    }

    return (
      <div className="show-content-wrapper">
        <div className="carousel-wrapper">
          <Carousel slidesToShow={2} >
            {photos}
          </Carousel>
        </div>
        {details}
        <Footer />
      </div>
    );
  }
}

export default ListingShow;
