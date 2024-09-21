class Recipe < ApplicationRecord
  has_many :ingredients, dependent: :destroy
  has_one_attached :picture

  validates :title, presence: true
  validates :ratings, presence: true, numericality: { greater_than: 0 }
  validates :image, presence: true
end
