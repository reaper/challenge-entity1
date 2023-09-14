module RecipesFinder
  def self.from_ingredients(ingredients = [])
    query = if ingredients.any?
      unions = ingredients.map {
        <<-SQL
          SELECT recipe_id, ? AS ingredient FROM ingredients
          WHERE content LIKE ?
          GROUP BY recipe_id
        SQL
      }.join(" UNION ")

      <<-SQL
        WITH recipe_for_ingredients_count AS (
          SELECT recipe_id FROM (#{unions}) recipe_ingredients
          GROUP BY recipe_ingredients.recipe_id
          HAVING COUNT(recipe_id) >= ?
        )

        SELECT recipes.*
        FROM recipes, recipe_for_ingredients_count
        WHERE recipes.id = recipe_for_ingredients_count.recipe_id
        ORDER BY recipes.ratings DESC
        LIMIT 9
      SQL
    else
      <<-SQL
        SELECT recipes.*
        FROM recipes
        ORDER BY recipes.ratings DESC
        LIMIT 9
      SQL
    end

    recipes = Recipe.find_by_sql(ActiveRecord::Base.sanitize_sql_array([
      query.squish,
      *ingredients.map { |i| [i, "%#{i}%"] }.flatten,
      ingredients.size
    ]))

    Rails.logger.info("Found #{recipes.size} recipes")
    recipes
  end
end
