# Sliced Client

Sliced allows you to save your recipes and scale the ingredients up or down by 1/4 increments.

This repository is for the front-end client. You can see the live version here:
https://sliced.rachanastasia.vercel.app/

### Demo Account

- **email** test@gmail.com
- **password** test-password

## Sliced Demo

## Tech Stack

### Front End

- React
- CSS3
- HTML5

### Testing

- Jest (smoke tests of all React component)

### Production

- Deployed with Vercel

## Codebase Structure

### /src/App.js

This is where the user context lives. This component renders the header, footer, and router.

### /src/components

All react components are stored in this folder. Every parent component has its own folder, containing the component file, the test file, and--in most cases--a CSS file.

The folders for RecipeList and RecipePage also contains relavent child components.

#### /src/components/Routes

This folder contains the public and private routes used in src/Router.js

### /src/services

This folder contains Javascript helper files that function in different ways.

#### /src/services/capitalize-recipe-title-service

Turns recipe title to lower case and capitalizes the first letter of every word.

#### src/services/user-recipe-api-services

Makes GET, POST, and DELETE requests to server.

#### src/services/token-service

Gets, clears, and verifies auth token.

#### src/services/auth-api-service

Makes POST request to server.

#### src/services/parse-input-service

Takes in a string from the user input and splits it into the propor data format based on regex and valid types.

#### src/services/parse-amount-service

Parses the amount_str returned from parse-input-service, seperating the number from the unit.

#### src/services/scale-service

Provides the scaling functionality in the component RecipePage.js
