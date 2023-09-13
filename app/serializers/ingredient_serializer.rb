class IngredientSerializer < ActiveModel::Serializer
  attributes :content

  belongs_to :recipe
end
