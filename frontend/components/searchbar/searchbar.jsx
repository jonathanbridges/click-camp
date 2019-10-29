import React from 'react';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const options = {
      types: ['(cities)'],
      componentRestrictions: { country: "us" }
    };

    const searchInput = document.querySelector(".listing-search-input");
    const autocomplete = new google.maps.places.Autocomplete(searchInput, options);

    google.maps.event.addDomListener(window, "load", autocomplete);
    let address;
    autocomplete.addListener("place_changed", () => {
      if (!autocomplete.getPlace().formatted_address) {
        address = autocomplete.getPlace("San Francisco").formatted_address;
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

    if (this.state.query === "San" || this.state.query === undefined) {
      this.setState({query: "San Francisco"});
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: this.state.query }, (res, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const lat = res[0].geometry.location.lat();
        const lng = res[0].geometry.location.lng();
        this.props.updateSearchCoords(lat, lng);
        setTimeout(() => this.props.history.push(`/discover`), 500);
      } else {
        this.props.updateSearchCoords(37.7758, -122.435);
        setTimeout(() => this.props.history.push(`/discover`), 500);
      }
    });
  }

  render() {
    return (
      <div className="search-wrapper">
        <div className="search-container"></div>
        <form className="search-main" onSubmit={this.handleSubmit}>
          <div>
            <span className="input-i">
              <i className="fas fa-search"></i>
            </span>
            <input  
              type="text"
              value={this.state.query}
              onChange={this.handleInput}
              name="listings" 
              id="listings"
              className="listing-search-input"
              dir="auto" 
              placeholder="Try San Francisco..." />
            <input 
              type="submit"
              value="Search"
              className={"search-btn"} />
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

export default withRouter(SearchBar);