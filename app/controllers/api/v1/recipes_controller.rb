class Api::V1::RecipesController < ApplicationController
  def index
    ingredients = params[:q]&.split(/\W/) || []
    render json: RecipesFinder.from_ingredients(ingredients)
  end
end
