class ApplicationController < ActionController::Base

    # Prevent CSRF attacks by raising an exception.
    # For APIs, you may want to use :null_session instead.
    # protect_from_forgery with: :exception

    helper_method :current_user, :logged_in?

    def current_user
        @current_user ||= User.find_by_session_token(session[:session_token])
    end

    def require_login
        render json: { base: ['Invalid Login Credentials'] }, status: 401
    end

    def login(user)
        session[:session_token] = user.reset_session_token!
        @current_user = user
    end

    def logged_in?
        !!current_user
    end

    def log_out
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

end
