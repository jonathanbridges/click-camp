Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :users, only: [:create]
    resources :listings, only: [:index, :show]
    resources :reservations, only: [:create, :destroy, :show, :index]
    resource :session, only: [:create, :destroy, :show]
  end

  root "static_pages#root"
end
