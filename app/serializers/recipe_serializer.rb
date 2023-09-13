class RecipeSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper

  attributes :id, :title, :image, :created, :cooktime, :preptime, :ratings, :category, :author, :ingredients

  def created
    object.created_at.strftime("%B %d, %Y")
  end

  def cooktime
    time_ago_in_words(object.cook_time.minutes.from_now)
  end

  def preptime
    time_ago_in_words(object.prep_time.minutes.from_now)
  end

  def ingredients
    object.ingredients.map do |ingredient|
      IngredientSerializer.new(ingredient).attributes
    end
  end
end
