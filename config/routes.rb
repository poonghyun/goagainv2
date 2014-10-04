GoAgainV2::Application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:create, :new]
  resource :session, only: [:create, :destroy, :new]

  namespace :api, defaults: { format: :json } do

  end
end
