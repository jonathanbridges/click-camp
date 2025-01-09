Rails.application.routes.draw do
  # Mount Active Storage routes
  mount ActiveStorage::Engine => '/rails/active_storage'

  namespace :api do
    namespace :v1 do
      resources :listings do
        resources :reviews, only: [:index, :create]
      end
      
      resources :reservations
      resources :users, only: [:show, :create, :update] do
        get :me, on: :collection
      end
      
      # Session management
      resource :session, only: [:create, :destroy]
    end
  end
end
