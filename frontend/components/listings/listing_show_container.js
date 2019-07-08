import { connect } from 'react-redux';
import { fetchListing } from '../../actions/listing_actions';
import ListingShow from './listing_show';

const mapStateToProps = (state, { match }) => {
  let listingId = parseInt(match.params.listingId);
  let listing = state.entities.listings[listingId];
  debugger
  return ({listing})

  // TODO: Selectors for finding Listing details:
  // const listing = selectListing(state.entities, listingId);
  // const reviews = selectReviewsForListing(state.entities, listing);
  // return {
  //   listingId,
  //   listing,
  //   reviews
  // };
};

const mapDispatchToProps = dispatch => ({
  fetchListing: id => dispatch(fetchListing(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingShow);
