import React from "react";

export default () => (
  <div className="py-16 bg-white sm:py-24 lg:py-32">
    <div className="flex flex-col px-6 mx-auto grid max-w-7xl lg:px-8">
      <div className="max-w-xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:col-span-7">
        <h2 className="inline sm:block lg:inline xl:block">It's dinner time !</h2>{' '}
        <p className="inline text-xl sm:block lg:inline xl:block">What can I cook with...</p>
      </div>
      <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
        <div className="flex gap-x-4">
          <label htmlFor="email-address" className="sr-only">
            Something
          </label>
          <input
            id="ingredient-query"
            name="ingredient-query"
            type="text"
            required
            className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter an ingredient"
          />
          <button
            type="submit"
            className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  </div>
);
