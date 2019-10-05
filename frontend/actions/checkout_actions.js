export const RECEIVE_CHECKOUT_INFO = 'RECEIVE_CHECKOUT_INFO';

export const receiveCheckoutInfo = reservationParams => {
  return ({
    type: RECEIVE_CHECKOUT_INFO,
    reservationParams: { [reservationParams.listing_id]: reservationParams }
  })
}
