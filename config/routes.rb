Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :users, only: [:create]
    resource :session, only: [:create, :destroy, :show]
    resources :listings, only: [:index, :show]
    resources :reservations, only: [:create, :destroy, :show, :index]
    resources :reviews, only: [:create, :destroy, :show, :index, :update]
  end

  root "static_pages#root"
end
