import React from 'react';

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
          <div className="tile-recommend">
            <i className="fas fa-thumbs-up" aria-hidden="true"></i>
          </div>
        )
      } else {
        recommends = (
          <div className="tile-recommend">
            <i className="fas fa-thumbs-down" aria-hidden="true"></i>
          </div>
        )
      }
      return (
        <div>
          <img src={`${this.props.review.photoUrl}`}></img>
          <p>{this.props.review.text}</p>
          <p>{this.props.review.username}</p>
          {recommends}
        </div>
      )
    }
  }
}

export default Review;