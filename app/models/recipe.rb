class Recipe < ApplicationRecord
  has_many :ingredients, dependent: :destroy

  validates :title, presence: true
  validates :ratings, presence: true, numericality: { greater_than: 0 }
  validates :image, presence: true
end
