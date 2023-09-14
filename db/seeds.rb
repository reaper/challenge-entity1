# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

recipes = File.read(Rails.root.join("data", "recipes-en.json"))
recipes_hash = JSON.parse(recipes)

Parallel.each(recipes_hash, in_processes: [2, Etc.nprocessors - 1].max) do |recipe_hash|
  ingredients = recipe_hash.delete("ingredients")

  recipe = Recipe.create!(recipe_hash)
  puts "Created recipe: #{recipe.title}"

  ingredients.each do |ingredient|
    recipe.ingredients.create!(content: ingredient)
    puts "\t- Created ingredient: #{ingredient}"
  end

  if recipe.image
    recipe.picture.attach(io: URI.open(recipe.image), filename: File.basename(URI.parse(recipe.image).path))
    puts "\t- Attached image from #{recipe.image}"
  end
rescue OpenURI::HTTPError => e
  puts "An error occurred: #{e.message}"
end
