module Api
  module V1
    class ReservationsController < BaseController
      before_action :set_reservation, only: [:show, :update, :destroy]
      rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found

      def index
        @reservations = current_user.reservations.includes(listing: :reviews)
        render json: ReservationBlueprint.render(@reservations, view: :extended)
      end

      def show
        render json: ReservationBlueprint.render(@reservation, view: :extended)
      end

      def create
        @reservation = current_user.reservations.build(reservation_params)
        
        if @reservation.save
          ReservationNotificationJob.perform_later(@reservation.id)
          render json: ReservationBlueprint.render(@reservation), status: :created
        else
          render json: { errors: @reservation.errors }, status: :unprocessable_entity
        end
      end

      def update
        if @reservation.update(reservation_params)
          render json: ReservationBlueprint.render(@reservation)
        else
          render json: { errors: @reservation.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        @reservation.destroy
        head :no_content
      end

      private

      def set_reservation
        @reservation = current_user.reservations.find(params[:id])
      end

      def reservation_params
        params.require(:reservation).permit(
          :listing_id,
          :check_in,
          :check_out,
          :guest_count
        )
      end

      def handle_not_found
        render json: { error: 'Reservation not found' }, status: :not_found
      end
    end
  end
end 