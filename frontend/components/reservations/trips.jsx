import React from 'react';
import Footer from '../footer/footer';
import PulseLoaderAnimation from '../loader/pulse_loader';

class Trips extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    }

    setTimeout(() => this.setState({ loading: false }), 1000);
  }

  render() {

    if (this.state.loading) {
      return (
        <div className='loader'>
          <PulseLoaderAnimation loading={this.state.loading} />
        </div>
      );
    }

    return (
      <div className="trips-whole-page">
        <div className="trips-container">
          
          <div className="trips-left-panel">
            <div className="bio-panel">
              <div className="bio-panel-header">
                <div className="bio-avatar"></div>
                <div className="bio-username"><h2>clickCamper</h2></div>
              </div>
              <div className="basic-info"><span className="icon icon-heart fa fa-heart"></span> Camping since July 2019</div>
              <div className="basic-info"><span className="icon fa fa-map-marker"></span> San Francisco</div>
              <div className="basic-info tagline"><span className="gray-text">Intro: </span>The woods are lovely, dark and deep. But I have a fire, here for heat, and smores aplenty! Time to eat.</div>
            </div>

            <div className="verified-panel">
              <div className="verified-panel-text">
                <p className="gray-text">Trusted Account</p>
                <p><span className="icon check-icon fa fa-check-circle-o"></span>Email address</p>
                <p><span className="icon check-icon fa fa-check-circle-o"></span>Facebook</p>
              </div>
            </div>
          </div>

          <div className="trips-right-panel">
            <h2>Trips Will Be Mapped Here</h2>
          </div>

        </div>
        <Footer />
      </div>
    )
  }
}

export default Trips;