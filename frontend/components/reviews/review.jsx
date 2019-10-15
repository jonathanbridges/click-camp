import React from 'react';
import { logoutCurrentUser } from '../../actions/session_actions';

class Review extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {

  }

  render() {

    if (this.props.review.text.length < 1) {
      return (
        <div></div>
      )
    } else {
      let recommends;
      if (this.props.review.recommends === true) {
        recommends = ( 
          <div>
            <div className="review-text">
              <i className="fas fa-thumbs-up tile-recommend" aria-hidden="true"></i>
              <p><span>{this.props.review.username}</span>recommends this listing.</p>
            </div>
            <p>{this.props.review.text}</p>
          </div>
        )
      } else {
        recommends = (
          <div>
            <div className="review-text">
              <i className="fas fa-thumbs-down tile-recommend" aria-hidden="true"></i>
              <p><span>{this.props.review.username}</span>doesn't recommend this listing.</p>
            </div>
            <p>{this.props.review.text}</p>
          </div>
        )
      }

      let img;
      if (this.props.review.photoUrl === undefined) {
        img = (
          <img src={`https://app-name-seeds.s3-us-west-1.amazonaws.com/campicon.png`}></img>
        )
      } else {
        img = (
          <img src={`${this.props.review.photoUrl}`}></img>
        )
      }

      return (
        <div className="review">
          {img}
          {recommends}
        </div>
      )
    }
  }
}

export default Review;