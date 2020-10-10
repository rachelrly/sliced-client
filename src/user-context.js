import React from 'react'

export default React.createContext({
    currentAuthToken: null,
    user_id: null,
    recipes: [],
    onLogin: () => { },
    onLogout: () => { },
    addRecipe: () => { },
    deleteRecipe: () => { },
    getRecipes: () => { }
})








// import React, { Component } from 'react'
// import TokenService from './services/token-service'
// import UserRecipesApiService from './services/user-recipes-api-service'


// const MyContext = React.createContext();

// class UserContext extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             currentAuthToken: null,
//             user_id: null,
//             recipes: []

//         }
//     }

//     onLogout = () => {

//     }

//     onLogin = (user_id) => {
//         const currentAuthToken = TokenService.getAuthToken();
//         if (currentAuthToken) {
//             this.setState({
//                 currentAuthToken,
//                 user_id
//             })
//         }
//     }

//     componentDidMount = () => {
//         if (this.state.user_id) {
//             UserRecipesApiService.getRecipes()
//                 .then(rec => {
//                     this.setState({
//                         recipes: [...rec]
//                     })


//                 })
//                 .catch(err => console.log(err.message))
//         }
//     }

//     render() {
//         let value = {
//             user_id: this.state.user_id,
//             recipes: this.state.recipes,
//             onLogout: this.onLogout,
//             onLogin: this.onLogin
//         }
//         return (
//             <MyContext.Provider value={value} />
//         )
//     }
// }

// export default UserContext