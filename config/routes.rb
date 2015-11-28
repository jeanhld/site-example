Rails.application.routes.draw do
  root 'base#home'
  get '/about', to: 'base#about'
  get '/prices', to: 'base#prices'
  get '/contact', to: 'base#contact'
end
