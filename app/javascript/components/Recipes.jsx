import React, { useState, useEffect } from "react";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/api/v1/recipes")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Unable to fetch recipes");
      })
      .then((res) => {
        setRecipes(res.data)
      })
  }, []);

  return (
    <>
      <div className="py-24 bg-white sm:py-32">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">My recipes... yummy!</h2>
            <p className="mt-2 text-lg text-gray-600 leading-8">
              Delicious recipes from our community.
            </p>
          </div>
          <div className="max-w-2xl mx-auto mt-16 grid grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {recipes.map((recipe, index) => (
              <div key={index} className="flex flex-col items-start justify-between">
                <div className="relative w-full">
                  <img
                    src={recipe.attributes.image}
                    alt=""
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                  <div className="flex items-center mt-8 text-xs gap-x-4">
                    <time dateTime={recipe.attributes.created_at} className="text-gray-500">
                      {recipe.attributes.created}
                    </time>
                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                      {recipe.attributes.category}
                    </span>
                  </div>
                  <div className="flex items-center text-xs gap-x-4">
                    <div className="flex items-center">
                        <svg className={ `w-4 h-4 mr-1 ${recipe.attributes.ratings >= 1 ? "text-yellow-300" : null }` } aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className={ `w-4 h-4 mr-1 ${recipe.attributes.ratings >= 2 ? "text-yellow-300" : null }` } aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className={ `w-4 h-4 mr-1 ${recipe.attributes.ratings >= 3 ? "text-yellow-300" : null }` } aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className={ `w-4 h-4 mr-1 ${recipe.attributes.ratings >= 4 ? "text-yellow-300" : null }` } aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className={ `w-4 h-4 mr-1 ${recipe.attributes.ratings == 5 ? "text-yellow-300" : null }` } aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <p className="ml-2 text-gray-600 dark:text-gray-400">{recipe.attributes.ratings} out of 5</p>
                    </div>
                  </div>
                  <div className="relative group">
                    <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-6 group-hover:text-gray-600">
                      <span>
                        <span className="absolute inset-0" />
                        {recipe.attributes.title}
                      </span>
                    </h3>
                    <p className="mt-5 text-xs text-gray-600 line-clamp-3 leading-6">
                      Preparation time: {recipe.attributes.preptime}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-6">
                      Cook time: {recipe.attributes.cooktime}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-6">
                      Author: {recipe.attributes.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipes;
