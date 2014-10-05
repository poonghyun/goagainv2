GoAgainV2::Application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:create, :new]
  resource :session, only: [:create, :destroy, :new]

  namespace :api, defaults: { format: :json } do
  	resources :businesses, only: [:show, :index, :create, :destroy, :update]
    resources :users, only: [:show, :update]
  	resources :reviews, only: [:show, :create, :destroy, :index, :update]
  	resources :photos, only: [:show, :create, :destroy, :index, :update]
  end
end
