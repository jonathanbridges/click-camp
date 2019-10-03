class Api::ReservationsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def show
    @reservation = Reservation.find(params[:id])
    render json: @reservation
  end

  def index
    @reservations = Reservation.includes(:listing).where(camper_id: current_user.id)
    render json: @reservations
  end

  def create
    @reservation = Reservation.new(reservation_params)

    if @reservation.save
      render json: @reservation
    else
      render json: @reservation.errors.full_messages, status: 422
    end
  end

  def destroy
    @reservation = Reservation.find(params[:id])

    if @reservation.destroy
      render json: @reservation
    else
      render json: @reservation.errors.full_messages, status: 422
    end
  end

  private

  def reservation_params
    params.require(:reservation).permit(
      :camper_id,
      :listing_id,
      :check_in,
      :check_out
    )
  end 

end
