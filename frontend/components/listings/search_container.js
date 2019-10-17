import { connect } from 'react-redux';
import { fetchListings, fetchListing } from '../../actions/listing_actions';
import { updateFilter } from '../../actions/filter_actions';
import Search from './search';

const mapStateToProps = (state, ownProps) => {
  return {
    listings: Object.values(state.entities.listings),
    currentUser: state.entities.users[state.session.id],
    mapSearchCoords: state.ui.search.coords
  }
}

const mapDispatchToProps = dispatch => ({
  fetchListings: (filters) => dispatch(fetchListings(filters)),
  fetchListing: id => dispatch(fetchListing(id)),
  updateFilter: (filter, value) => dispatch(updateFilter(filter, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
