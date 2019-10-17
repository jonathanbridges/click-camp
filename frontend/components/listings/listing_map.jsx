import React from 'react';
import MarkerManager from '../../util/marker_manager';
import { withRouter } from 'react-router-dom';

// const mapOptions = {
//   center: { lat: 37.7758, lng: -122.435 }, // this is SF
//   zoom: 13,
//   mapTypeControl: false,
//   rotateControl: false,
//   fullscreenControl: false,
//   streetViewControl: false,
//   mapTypeId: 'terrain'
// };

class ListingMap extends React.Component {
  constructor(props) {
    super(props);
    this.renderMap = this.renderMap.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);

  }

  componentDidMount() {
   
    this.renderMap();
  }

  componentDidUpdate(prevProps) {
    this.MarkerManager.updateMarkers(this.props.listings);
    if (this.props.mapSearchCoords !== prevProps.mapSearchCoords) {
      this.renderMap();
    }
  }

  componentWillUnmount() {
    google.maps.event.clearListeners(this.map, 'idle');
  }

  renderMap() {
    const mapOptions = {
      center: this.props.mapSearchCoords,
      zoom: 13,
      gestureHandling: "greedy",
      mapTypeControl: false,
      rotateControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeId: 'terrain'
    };

    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick);

    this.registerListeners();
    this.MarkerManager.updateMarkers(this.props.listings);
  }

  registerListeners() {
    google.maps.event.addListener(this.map, 'idle', () => {
      const { north, south, east, west } = this.map.getBounds().toJSON();

      const bounds = {
        northEast: { lat: north, lng: east },
        southWest: { lat: south, lng: west }
      };

      this.props.updateFilter('bounds', bounds);
    });
  }

  handleMarkerClick(listing) {
    this.props.history.push(`/discover/${listing.id}`);
  }

  render() {
    let { listings } = this.props;

    return (
      <div id="map-wrapper" ref={map => this.mapNode = map}></div>
    );
  }

}

export default withRouter(ListingMap);
