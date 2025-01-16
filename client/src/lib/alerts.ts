export enum AlertType {
  RESERVATION_CREATED = 'reservation_created',
  RESERVATION_UPDATED = 'reservation_updated',
  RESERVATION_DELETED = 'reservation_deleted',
  REVIEW_CREATED = 'review_created',
  REVIEW_UPDATED = 'review_updated',
  REVIEW_DELETED = 'review_deleted',
}

export const AlertMessages: Record<AlertType, string> = {
  [AlertType.RESERVATION_CREATED]: 'Reservation created successfully!',
  [AlertType.RESERVATION_UPDATED]: 'Reservation updated successfully!',
  [AlertType.RESERVATION_DELETED]: 'Reservation cancelled successfully.',
  [AlertType.REVIEW_CREATED]: 'Review submitted successfully!',
  [AlertType.REVIEW_UPDATED]: 'Review updated successfully!',
  [AlertType.REVIEW_DELETED]: 'Review deleted successfully.',
}; 

export const getAlertMessage = (alert: AlertType): string => {
  return AlertMessages[alert];
};
