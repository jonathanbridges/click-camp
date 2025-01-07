Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :listings do
        resources :reviews, only: [:index, :create]
      end
      
      resources :reservations
      resources :users, only: [:show, :create, :update]
      
      # Session management
      resource :session, only: [:create, :destroy]
    end
  end

  # Active Storage routes should be handled before the catch-all
  get '/rails/active_storage/*path', to: 'active_storage/blobs/redirect#show'

  # Optional: Catch-all route for client-side routing
  get '*path', to: 'application#frontend_index_html', constraints: lambda { |req|
    req.path.exclude?('api') && req.path.exclude?('rails/active_storage')
  }
end
