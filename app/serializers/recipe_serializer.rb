class RecipeSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper
  include Rails.application.routes.url_helpers

  attributes :id, :title, :created, :cooktime, :preptime, :ratings, :category, :author, :picture, :ingredients

  def created
    object.created_at.strftime("%B %d, %Y")
  end

  def cooktime
    time_ago_in_words(object.cook_time.minutes.from_now)
  end

  def preptime
    time_ago_in_words(object.prep_time.minutes.from_now)
  end

  def picture
    object.picture.attached? ? url_for(object.picture) : nil
  end

  def ingredients
    object.ingredients.map do |ingredient|
      IngredientSerializer.new(ingredient).attributes
    end
  end
end
