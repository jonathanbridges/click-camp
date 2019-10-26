import React from 'react';
import { withRouter } from 'react-router-dom';

class NavSearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const searchInput = document.querySelector(".nav-search-input");
    const autocomplete = new google.maps.places.Autocomplete(searchInput);

    google.maps.event.addDomListener(window, "load", autocomplete);
    let address;
    autocomplete.addListener("place_changed", () => {
      if (!autocomplete.getPlace().formatted_address) {
        address = autocomplete.getPlace("San Francisco").name;
        this.setState({ query: address });
        this.handleSubmit();
      } else {
        address = autocomplete.getPlace().formatted_address;
        this.setState({ query: address });
        this.handleSubmit();
      }
    });
  }

  handleInput(e) {
    this.setState({
      query: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: this.state.query }, (res, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const lat = res[0].geometry.location.lat();
        const lng = res[0].geometry.location.lng();
        this.props.updateSearchCoords(lat, lng);
        this.props.history.push(`/discover?lat=${lat}&lng=${lng}`);
      } else {
        this.props.updateSearchCoords(37.7749295, -122.4194155);
        this.props.history.push(`/discover?lat=37.7749295&lng=-122.4194155`);
      }
    });
  }

  render() {
    return (
      <div className="nav-search-wrapper">
        <div className="nav-search-container"></div>
        <form className="nav-search-main" onSubmit={this.handleSubmit}>
          <div>
            <span className="input-i">
              <i className="fas fa-search"></i>
            </span>
            <input  
              type="text"
              value={this.state.query}
              onChange={this.handleInput}
              name="listings" 
              className="nav-search-input"
              dir="auto" 
              placeholder="Try San Francisco..." />
            <input 
              type="submit"
              value="Search"
              className={"nav-search-btn"} />
          </div>
          {/* <div className="dates-btn">
            <span className="input-i">
              <i className="far fa-calendar"></i>
            </span>
            <span className="value">Enter Dates </span>
          </div>
          <div className="categories-btn">
            <span className="input-i">
              <i className="fas fa-campground"></i>
            </span>
            <span className="value">All camping</span>
            <span className="input-i-chev">
              <i className="fas fa-chevron-down"></i>   
            </span>         
          </div> */}
          {/* <Link to={`/discover`}>
            <button className=  type="submit">Search</button>
          </Link> */}
        </form>
      </div>

   
    );
  }
}

export default withRouter(NavSearchBar);