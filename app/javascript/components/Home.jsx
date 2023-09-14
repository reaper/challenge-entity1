import React from "react";
import Recipes from "./Recipes";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      recipes: []
    }
  }

  componentDidMount() {
    this.fetchRecipes("");
  }

  changeHandler = (e) => {
    this.fetchRecipes(e.target.value);
  }

  fetchRecipes(query) {
    fetch("/api/v1/recipes?" + new URLSearchParams({
      q: query
    }))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error("Unable to fetch recipes");
      })
      .then((res) => {
        this.setState({ recipes: res.data });
      })
  }

  render() {
    return (
      <div className="justify-center w-full py-16 bg-white sm:py-24 lg:py-32 px-32">
        <div className="flex flex-col px-6">
          <div className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:col-span-7">
            <h2 className="inline sm:block lg:inline xl:block">It's dinner time !</h2>{' '}
            <p className="inline text-xl sm:block lg:inline xl:block">What can I cook with...</p>
          </div>
          <form className="lg:col-span-5 lg:pt-2">
            <div className="flex gap-x-4">
              <input
                id="ingredient-query"
                name="ingredient-query"
                type="text"
                required
                className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter ingredients seperated by non-word characters (spaces, commas, etc.)"
                onChange={this.changeHandler}
              />
            </div>
          </form>
        </div>

        <Recipes recipes={this.state.recipes}/>
      </div>
    );
  }
}

export default Home;
