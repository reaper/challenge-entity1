require "test_helper"

class Api::V1::RecipesControllerTest < ActionDispatch::IntegrationTest
  test "should get recipes" do
    get api_v1_recipes_url
    assert_response :success
  end

  test "should get recipes with data" do
    create(:recipe)

    get api_v1_recipes_url
    assert_response :success
    assert response.parsed_body.size.positive?
  end

  test "should get recipes with matching data" do
    recipe = create(:recipe)

    get api_v1_recipes_url
    assert_response :success

    assert response.parsed_body["data"].any?
    response.parsed_body["data"]&.first.try do |data|
      assert_equal recipe.id, data["id"].to_i

      attributes = data["attributes"]
      assert_equal recipe.title, attributes["title"]
      assert_equal recipe.ratings, attributes["ratings"]
      assert_equal recipe.category, attributes["category"]
      assert_equal recipe.author, attributes["author"]

      assert attributes["created"].present?
      assert attributes["cooktime"].present?
      assert attributes["preptime"].present?
      assert attributes["ingredients"].any?
    end
  end

  test "should get recipes with blank query param" do
    create(:recipe)
    get api_v1_recipes_url, params: { q: "" }
    assert_response :success
  end

  test "should get recipes with query param and without data" do
    get api_v1_recipes_url, params: { q: "" }
    assert_response :success
  end

  test "shouldn't get recipes with query param not matching any recipe" do
    create(:recipe)

    get api_v1_recipes_url, params: { q: "yummmmmmmy" }
    assert_response :success
    assert response.parsed_body["data"].blank?
  end

  test "should get recipes with query param matching a recipe" do
    recipes = 10.times.map { create(:recipe) }
    recipe = recipes.sample

    get api_v1_recipes_url, params: { q: recipe.ingredients.first.content }
    assert_response :success
    assert response.parsed_body["data"].any?

    assert response.parsed_body["data"].any? do |data|
      recipe.id == data["id"].to_i
    end
  end

  test "should get recipes with query param matching recipes with ingredient" do
    ingredient = Faker::Food.ingredient

    5.times.map do
      recipe = create(:recipe)
      recipe.ingredients << create(:ingredient, content: ingredient, recipe: recipe)
      recipe
    end

    get api_v1_recipes_url, params: { q: ingredient }
    assert_response :success
    assert response.parsed_body["data"].any?

    assert_equal response.parsed_body["data"].size, 5
    assert response.parsed_body["data"].all? do |data|
      data["attributes"]["ingredients"].any? do |ingredient|
        ingredient["content"].downcase.include?(ingredient.downcase)
      end
    end
  end

  test "should get recipes with query params matching recipes with ingredient" do
    ingredients = 3.times.map { Faker::Food.ingredient }

    5.times.map do
      recipe = create(:recipe)

      ingredients.each do |ingredient|
        recipe.ingredients << create(:ingredient, content: ingredient, recipe: recipe)
      end

      recipe
    end

    get api_v1_recipes_url, params: { q: ingredients.join(",") }
    assert_response :success
    assert response.parsed_body["data"].any?

    assert_equal response.parsed_body["data"].size, 5

    assert ingredients.all? do |ingredient|
      response.parsed_body["data"].all? do |data|
        data["attributes"]["ingredients"].any? do |inner_ingredient|
          inner_ingredient["content"].downcase.include?(ingredient.downcase)
        end
      end
    end
  end
end
