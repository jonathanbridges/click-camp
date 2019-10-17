export const fetchListings = (filters) => {
  return (
    $.ajax({
      method: 'GET',
      url: `/api/listings?bounds=${JSON.stringify(filters.bounds)}`
    })
  )
};

export const fetchListing = id => (
  $.ajax({
    method: 'GET',
    url: `api/listings/${id}`,
  })
);