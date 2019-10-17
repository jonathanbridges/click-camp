export const fetchListings = (filters) => {
  // handles AJAX calls for basic listing retrieval
  if (filters === undefined) {
    return (
      $.ajax({
        method: 'GET',
        url: `/api/listings`
      })
    )
  // handles AJAX calls for listing retrieval when using Maps
  } else {
    return (
      $.ajax({
        method: 'GET',
        url: `/api/listings?bounds=${JSON.stringify(filters.bounds)}`
      })
    )
  }
};

export const fetchListing = id => (
  $.ajax({
    method: 'GET',
    url: `api/listings/${id}`,
  })
);