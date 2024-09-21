FactoryBot.define do
  factory :ingredient do
    content { Faker::Food.ingredient }
  end
end
