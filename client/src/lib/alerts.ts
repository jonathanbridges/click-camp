export enum AlertType {
  RESERVATION_CREATED = 'reservation_created',
  RESERVATION_DELETED = 'reservation_deleted',
  RESERVATION_UPDATED = 'reservation_updated',
}

export const getAlertMessage = (type: AlertType): string => {
  switch (type) {
    case AlertType.RESERVATION_CREATED:
      return 'Reservation confirmed successfully!';
    case AlertType.RESERVATION_DELETED:
      return 'Reservation cancelled successfully';
    case AlertType.RESERVATION_UPDATED:
      return 'Reservation updated successfully';
    default:
      return 'Operation completed successfully';
  }
}; 