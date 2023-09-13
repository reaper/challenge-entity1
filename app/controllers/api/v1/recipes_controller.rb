class Api::V1::RecipesController < ApplicationController
  def index
    recipes = Recipe
      .limit(10)
      .includes(:ingredients)
      .order(ratings: :desc)

    render json: recipes
  end
end
