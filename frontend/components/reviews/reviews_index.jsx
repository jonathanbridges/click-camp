import React from 'React'

class ReviewsIndex extends React.Component {

  constructor(props) {
    super(props);

    
  }

  componentDidMount() {
    this.props.fetchReviews();
  }

  render() {
    debugger;
    return (
      <div>This is the reviews container</div>
    )
  }
}

export default ReviewsIndex;