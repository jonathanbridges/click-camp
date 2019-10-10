import React from 'react';

class Review extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    debugger;
    if (this.props.text.length < 1) {
      return (
        <div></div>
      )
    } else {
      return (
        <div>
          <h1>This is a single review</h1>
          <p>{this.props.text}</p>
          <p>{this.props.recommends}</p>
        </div>
      )
    }
  }
}

export default Review;