import { connect } from 'react-redux';
import DiscoverListingIndex from './discover_listing_index';
import { fetchListings, fetchListing } from '../../actions/listing_actions';
import { updateSearchCoords } from "../../actions/search_actions";

const msp = (state, ownProps) => {
  return ({
    listings: Object.values(state.entities.listings)
  });
}

const mdp = dispatch => {
  return ({
    fetchListings: (filters) => dispatch(fetchListings(filters)),
    fetchListing: id => dispatch(fetchListing(id)),
    updateSearchCoords: (lat, lng) => dispatch(updateSearchCoords(lat, lng))
  });
}

export default connect(msp, mdp)(DiscoverListingIndex);
