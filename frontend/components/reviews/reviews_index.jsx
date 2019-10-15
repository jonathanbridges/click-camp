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
    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleRecommendChange = this.handleRecommendChange.bind(this);
    this.validate = this.validate.bind(this);

  }

  componentDidMount() {
    if (this.props.reviews.length > 0) {
      this.props.reviews.forEach(review => {
        if (review.listing_id === this.props.listing.id) {
          if (review.reviewer_id === this.props.currentUser.id && this.state.reviewed === false) {
            this.setState({
              reviewed: true,
              text: review.text,
              recommends: review.recommends,
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
      .then(this.props.fetchReviews)
      .then(this.setState({ 
          formOpen: false, 
          text: '',
          recommends: null,
          errors: []
        })
      );
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
      .then(this.props.fetchReviews)
      .then(this.setState({
        formOpen: false,
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

    // Styles Leave a Review Button for Users with no Review
    if (this.state.formOpen === false && this.state.reviewed === false) {
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
                <label for="recommend">
                  <i className="fas fa-thumbs-up review-thumbs-up" aria-hidden="true"></i>
                </label>
                <input type="radio" id="norecommend" value="false"
                  checked={this.state.recommends === 'false'}
                  onChange={this.handleRecommendChange} />
                <label for="norecommend">
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
    // Styles Form for Users Updating their Review
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
              <input className="btn-main" type="submit" value="Update Review" />
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