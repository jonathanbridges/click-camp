Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
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

  # Optional: Catch-all route for client-side routing
  get '*path', to: 'application#frontend_index_html', constraints: lambda { |req|
    req.path.exclude? 'api'
  }
end
