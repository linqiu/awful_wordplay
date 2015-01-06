class WordsController < ApplicationController
  def show
    word = params[:word]
    token = 'q4iFO4Y6lFg3jlH9qJ5zZZVgFS4'
    url = 'https://www.wordsapi.com/words'

    response = HTTParty.get("#{url}/#{word}/definitions?accessToken=#{token}")
    render json: response.body
  end
end