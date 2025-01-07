module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user
  end

  private

  def authenticate_user
    unless current_user
      render json: { error: 'Not authenticated' }, status: :unauthorized
    end
  end
end 