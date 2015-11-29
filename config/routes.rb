Rails.application.routes.draw do
  root 'base#home'
  get '/about', to: 'base#about'
  get '/prices', to: 'base#prices'
  resources :contacts, only: [:new, :create]
end
