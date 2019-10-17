import React from 'react';

class ListingMap extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 }, // this is SF
      zoom: 13,
      mapTypeControl: false,
      rotateControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeId: 'terrain'
    };

    this.map = new google.maps.Map(this.mapNode, mapOptions);
  }

  render() {
    return (
      <div id="map-wrapper" ref={map => this.mapNode = map}></div>
    )
  }

}

export default ListingMap;