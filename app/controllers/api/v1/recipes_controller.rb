class Api::V1::RecipesController < ApplicationController
  def index
    ingredients = params[:q]&.split(/\W/) || []
    render json: ::RecipesFinder.find_recipes(ingredients)
  end
end
