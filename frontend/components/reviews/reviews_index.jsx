import React from 'react'
import Review from './review';
import PulseLoaderAnimation from '../loader/pulse_loader';

class ReviewsIndex extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      formOpen: false,
      reviewId: null,
      text: '',
      recommends: null,
      errors: [],
      reviewed: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRecommendChange = this.handleRecommendChange.bind(this);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    if (this.props.reviews.length > 0) {
      this.props.reviews.forEach(review => {
        if (review.listing_id === this.props.listing.id) {
          if ((this.props.currentUser !== undefined) && (review.reviewer_id === this.props.currentUser.id) && (this.state.reviewed === false)) {
            this.setState({
              reviewed: true,
              reviewId: review.id,
              text: review.text,
              recommends: review.recommends,
              reviewId: review.id
            })
          }
        }
      }, this)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reviews !== this.props.reviews) {
      let reviews = Object.values(this.props.reviews);
      reviews.forEach(review => {
        if (review.listing_id === this.props.listing.id) {
          if (this.props.currentUser !== undefined && review.reviewer_id === this.props.currentUser.id) {
            this.setState({
              reviewId: review.id
            })
          }
        }
      }, this)
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({formOpen: true})
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleRecommendChange(e) {
    this.setState({
      recommends: e.target.value
    });
  }

  handleCreate(e) {
    e.preventDefault();

    const errors = this.validate();
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    let formatted = {
      text: this.state.text,
      recommends: this.state.recommends,
      listing_id: this.props.listing.id,
      reviewer_id: this.props.currentUser.id
    }

    this.props.createReview(formatted)
      .then(() => this.props.fetchReviews())
      .then(this.setState({
          reviewed: true,
          formOpen: false,
          errors: []
        })
      )
    
  }

  handleUpdate(e) {
    e.preventDefault();

    const errors = this.validate();
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    let formatted = {
      id: this.state.reviewId,
      text: this.state.text,
      recommends: this.state.recommends,
      listing_id: this.props.listing.id,
      reviewer_id: this.props.currentUser.id
    }

    this.props.updateReview(formatted)
      .then(() => this.props.fetchReviews())
      .then(this.setState({
        formOpen: false,
        errors: []
      })
    );
  }

  handleDelete(e) {
    e.preventDefault();

    this.props.deleteReview(this.state.reviewId)
      .then(() => this.props.fetchReviews())
      .then(this.setState({
        reviewed: false,
        formOpen: false,
        reviewId: null,
        text: '',
        recommends: null,
        errors: []
      })
    );
  }

  validate() {
    const errors = [];

    if (this.state.text.length < 8) {
      errors.push("Review must be longer than 8 characters");
    }
    if (this.state.text.length > 255) {
      errors.push("Review must be 255 characters or less.");
    }
    if (this.state.recommends === null) {
      errors.push("Select a Recommend Option");
    }
  
    return errors;
  }


  render() {
    if (this.props.reviews.length === undefined) {
      return (
        <div className="review-loader"><PulseLoaderAnimation /></div>
      )
    }

    let reviews = [];
    if (this.props.reviews.length > 0) {
      this.props.reviews.forEach(review => {
        if (review.listing_id === this.props.listing.id) {
          reviews.push(
            <Review
              review = {review}
              key = {review.id}
              currentUser={this.props.currentUser}
            />
          )
        }
      }, this)
    }

    let userReview;

    // Styles Leave a Review Button for Users who are not Signed In
    if (this.props.currentUser === undefined) {
      userReview = (
        <div className="review-index-header">
          <p className="review-index">{`${reviews.length}`} written reviews</p>
          <button className="btn-main" onClick={() => this.props.openModal('login')}>Log in to Review</button>
        </div>
      )
    // Styles Leave a Review Button for Users with no Review
    } else if (this.state.formOpen === false && this.state.reviewed === false) {
      userReview = (
        <div className="review-index-header">
          <p className="review-index">{`${reviews.length}`} written reviews</p>
          <button className="btn-main" onClick={this.handleSubmit}>Leave a Review</button>
        </div>
      )
    // Stlyes Edit a Review Button for Users with a Review
    } else if (this.state.formOpen === false && this.state.reviewed === true) {
      userReview = (
        <div className="review-index-header">
          <p className="review-index">{`${reviews.length}`} written reviews</p>
          <button className="btn-main" onClick={this.handleSubmit}>Edit your Review</button>
        </div>
      )
    // Styles Form for Users leaving their First Review
    } else if (this.state.formOpen === true && this.state.reviewed === false) {
      let errors = this.state.errors;
      userReview = (
        <div className="review-index-header">
          <form className="review-form" onSubmit={this.handleCreate}>
            <p>Your Review of {this.props.listing.name}:</p>
            <textarea value={this.state.text} onChange={this.handleChange} />
            <div className="review-footer">
              <div className="radio">
                <p>Recommend?</p>
                <input type="radio" id="recommend" value="true" 
                  checked={this.state.recommends === 'true'}
                  onChange={this.handleRecommendChange} />
                <label htmlFor="recommend">
                  <i className="fas fa-thumbs-up review-thumbs-up" aria-hidden="true"></i>
                </label>
                <input type="radio" id="norecommend" value="false"
                  checked={this.state.recommends === 'false'}
                  onChange={this.handleRecommendChange} />
                <label htmlFor="norecommend">
                  <i className="fas fa-thumbs-down review-thumbs-down" aria-hidden="true"></i>
                </label>
              </div>
              <input className="btn-main" type="submit" value="Create Review" />
            </div>
            {errors.map(error => (
              <p className="review-error" key={error}>{error}</p>
            ))}
          </form>
        </div>
      )
    // Styles Form for Users Updating or Deleting their Review
    } else if(this.state.formOpen === true && this.state.reviewed === true) {
      let errors = this.state.errors;
      userReview = (
        <div className="review-index-header">
          <form className="review-form" onSubmit={this.handleUpdate}>
            <p>Your Review of {this.props.listing.name}:</p>
            <textarea value={this.state.text} onChange={this.handleChange} />
            <div className="review-footer">
              <div className="radio">
                <p>Recommend?</p>
                <input type="radio" id="recommend" value="true"
                  checked={this.state.recommends === 'true'}
                  onChange={this.handleRecommendChange} />
                <label htmlFor="recommend">
                  <i className="fas fa-thumbs-up review-thumbs-up" aria-hidden="true"></i>
                </label>
                <input type="radio" id="norecommend" value="false"
                  checked={this.state.recommends === 'false'}
                  onChange={this.handleRecommendChange} />
                <label htmlFor="norecommend">
                  <i className="fas fa-thumbs-down review-thumbs-down" aria-hidden="true"></i>
                </label>
              </div>
              <div className="review-buttons">
                <input className="btn-main" type="submit" value="Update Review" />
                <p>or</p>
                <button className="btn-main" onClick={this.handleDelete}>Delete Review</button>
              </div>
            </div>
            {errors.map(error => (
              <p className="review-error" key={error}>{error}</p>
            ))}
          </form>
        </div>
      )
    }

    return (
      <div>
        {userReview}
        {reviews}
      </div>
    )
  }
}

export default ReviewsIndex;