Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  resources :images, only: [:index, :create, :show, :destroy]
  post 'upload', to: 'images#upload'
  get 'gallery', to: 'images#index'

  devise_for :users, controllers: { sessions: 'api/v1/sessions', registrations: 'users/registrations' }
  namespace :api do
    mount_devise_token_auth_for 'User', at: 'auth'
  end
  devise_scope :user do
    post 'signup', to: 'devise/registrations#create'
    get 'profile', to: 'devise/registrations#edit'   # For viewing the profile page
    patch 'profile', to: 'devise/registrations#update' # For updating the profile
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root 'images#index'

end
