import React from 'React';

class TripsIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchListings();
    this.props.fetchReservationsByUserId(this.props.currentUser);
  }

  render () {
    return (
      <div></div>
    )
  }
}

export default TripsIndex;