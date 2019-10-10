import React from 'react'
import Review from './review';

class ReviewsIndex extends React.Component {

  constructor(props) {
    super(props);


  }

  render() {
    let reviews = [];
    if (this.props.reviews.length > 0) {
      this.props.reviews.forEach(review => {
        if (review.listing_id === this.props.listing.id) {
          reviews.push(
            <Review
              review = {review}
              key = {review.id}
            />
          )
        }
      }, this)
    }

    return (
      <div>
        {reviews}
      </div>
    )
  }
}

export default ReviewsIndex;