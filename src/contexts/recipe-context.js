import React, { createContext, useState } from 'react';


export const RecipeContext = createContext();

function RecipeContextProvider({ children }) {
  const [recipes, setRecipes] = useState([])




  // getRecipes = (user_id) => {
  //   UserRecipesApiService.getRecipes(this.state.user_id)
  //     .then(rec => {
  //       this.setState({
  //         recipes: rec
  //       })
  //     })

  //     .catch(err => console.log(err.message))
  // }

  // getRecipesAfterDelete = (user_id, recipe_id) => {
  //   UserRecipesApiService.getRecipes(user_id)
  //     .then(rec => rec.filter(r => r.id !== recipe_id))
  //     .then(filtered => {
  //       this.setState({
  //         recipes: filtered
  //       })
  //     })
  //     .catch(err => console.log(err.message))
  // }


  // addRecipe = (recipe) => {

  //   let newReicpe = [recipe, ...this.state.recipes]
  //   this.setState({
  //     recipes: newReicpe
  //   })

  // }
  // //check to see if this function does anythign
  // deleteRecipe(recipes, recipe_id) {
  //   const filtered = recipes.filter(rec => rec.id !== recipe_id)

  //   this.setState({
  //     recipes: filtered
  //   })

  // }

  // toggleLoading = () => {
  //   let toggle = this.state.loading;
  //   toggle = !toggle;
  //   this.setState({
  //     loading: toggle
  //   })
  // }












  const value = {}
  return <RecipeContext.Provider value={value}> {children}</RecipeContext.Provider>

}

export default RecipeContextProvider;