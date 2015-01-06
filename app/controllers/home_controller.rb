class HomeController < ApplicationController
  def index
  end

  def show
      view = params[:view]
      render "angular/#{view}", :formats => [:html], :layout => false
  end
end