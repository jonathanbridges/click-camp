import React from 'react'
import Review from './review';

class ReviewsIndex extends React.Component {

  constructor(props) {
    super(props);


  }

  componentDidMount() {
    this.props.fetchReviews();
  }

  render() {
    let reviews = [];
    if (this.props.reviews.length > 0) {
      this.props.reviews.forEach(review => {
        if (review.listing_id === this.props.listing.id) {
          reviews.push(
            <Review
              reviewerId = {review.reviewer_id}
              text = {review.text}
              recommends = {review.recommends}
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