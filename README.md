# Sliced Client

Sliced allows you to save your recipes and scale the ingredients up or down by 1/4 increments

This repository is for the front-end client.

Live version: https://sliced.rachanastasia.vercel.app/

back-end repo: https://github.com/Rachanastasia/sliced-API

### Demo Account

- **email** test@gmail.com
- **password** test-password

## Images

![](/screenshots/list.jpg)

Users can view all the recipes in a list.

![](/screenshots/input.jpg)

Users can view a live preview of how their recipe is being parsed to adjust their input accordingly.

![](/screenshots/recipe.jpg)

Once a recipe is created, users can scale the list of ingredients up or down by increments of 1/4.

## Tech Stack

- React
- CSS3
- HTML5
- GraphQL
- Apollo Client
- Apollo Link
- React Router
- Jest
- Deployed with Vercel

## Codebase

### Components

This folder contains all components for the app. Every component is in its own folder with a file containing a smoke test.

- Header
- Footer
- Loading (renders the loading indicator)
- AddRecipe (contains Preview)
- Preview
- ErrorText (rendered in forms)
- LandingPage
- Login
- PageNotFound
- RecipeList
- RecipePage (shows individual recipe with slider)
- Register
- Router

### Contexts

#### UserContext

This file contains the instance of context and a component which renders the context provider.

UserContextProvider has all the top-level state for the app such as loading, current user's recipes, errors, etc.

This component also had functions that handle the login and log out.

### Hooks

#### useFormatRecipeTitle()

This hook capitalizes the first letter of every word of a string for titles.

#### useScale()

This hook scales the ingredient amounts based on the position of the slider. The stack of ternary operators renders the appropriate fraction for the float value.

### Services

This folder contains all non-hook JavaScript helper functions

#### UserRecipesApiService

Creates and deletes recipes through the old REST endpoint.

#### TokenService

Gets, clears, and verifies JWT auth token.

#### AuthApiService

Posts login and new user to REST endpoints.

#### ParseTextInput

This function takes in a long string of recipe ingredients and returns an array of objects, containing the unit, amount, and title for all ingredients.

##### value-equiv.json

This file contains all of the unit equivalencies. If a word matches a key in this file, it is considered a unit by the algorithm and is replaced with the abbreviation.

It is called when the text is being parsed in the function above.

### CSS

#### variables.css

This file contains all CSS variables used throughout the project.

#### main.css

This file styles the DOM elements.

#### form.css

This file sets up a unified form structure that is applied everywhere.

#### Component based stylesheets

The following stylesheets contain class-based styles for the specified component and their children.

- AddRecipe.css
- Footer.css
- Header.css
- LandingPage.css
- Loading.css
- RecipeList.css
- RecipePage.css
- RecipePageIngredients.css
