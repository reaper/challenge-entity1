FactoryBot.define do
  factory :recipe do
    title { Faker::Food.dish }
    cook_time { rand(1..60) }
    prep_time { rand(1..60) }
    ratings { rand(1..5) }
    cuisine { "" }
    category { Faker::Food.ethnic_category }
    author { Faker::Book.author }
    image { Faker::LoremFlickr.image(size: "300x300", search_terms: ["food"]) }

    after(:build) do |recipe|
      rand(1..10).times { recipe.ingredients << build(:ingredient, recipe: recipe) }
    end
  end
end
