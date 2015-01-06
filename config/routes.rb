Rails.application.routes.draw do
  root "home#index"

  get 'views/*view',     :to => 'home#show'
  get 'words/:word',           :to => 'words#show'
end