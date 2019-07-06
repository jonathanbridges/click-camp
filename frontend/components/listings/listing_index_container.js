import { connect } from 'react-redux';
import { fetchListings } from '../../actions/listing_actions';
import ListingIndex from './listing_index';

const mapStateToProps = (state, ownProps) => {
  let listings = Object.values(state.entities.listings)
  return ({ listings })
}

const mapDispatchToProps = dispatch => ({
  fetchListings: () => dispatch(fetchListings()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListingIndex)