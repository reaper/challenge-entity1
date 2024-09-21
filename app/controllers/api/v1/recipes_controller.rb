class Api::V1::RecipesController < ApplicationController
  def index
    # split ingredients by non-word characters
    # TODO: handle graphically ingredients to add space between words
    ingredients = params[:q]&.split(/\W/) || []
    render json: RecipesFinder.from_ingredients(ingredients)
  end
end
