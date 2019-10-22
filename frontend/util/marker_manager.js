
class MarkerManager {
  constructor(map, handleMarkerClick) {
    this.map = map;
    this.markers = {};

    this.handleMarkerClick = handleMarkerClick;
  }

  updateMarkers(listings) {
    let listingObj = {};
    listings.forEach(listing => (listingObj[listing.id] = listing));

    listings
      .filter(listing => !this.markers[listing.id])
      .forEach(newListing => this.createMarkerFromListing(newListing));

    Object.keys(this.markers)
      .filter(listingId => !listingObj[listingId])
      .forEach(listingId => this.removeMarker(this.markers[listingId]));
  }

  createMarkerFromListing(listing) {
    let myPosition = {
      lat: listing.lat,
      lng: listing.lng
    };

    const mapIcon = {
      url: "https://app-name-seeds.s3-us-west-1.amazonaws.com/click-camp-map-icon.png",
      scaledSize: new google.maps.Size(50, 50)
    }

    if (!this.markers[listing.id]) {
      let marker = new google.maps.Marker({
        position: myPosition,
        animation: google.maps.Animation.DROP,
        map: this.map,
        title: listing.name,
        icon: mapIcon,
        // label: {
        //   text: `${listing.name}`,
        //   fontSize: "13px",
        //   fontWeight: "bold",
        //   color: "#484848"
        // }
      });

      this.markers[listing.id] = marker;
      let markerIcon = this.markers[listing.id];
      markerIcon.addListener("click", () =>
        this.handleMarkerClick(listing)
      );
    }
  }

  removeMarker(marker) {
    if (this.markers[marker.id]) {
      this.markers[marker.id].setMap(null);
      delete this.markers[marker.id];
    }
  }
}

export default MarkerManager;
