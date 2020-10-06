const ParseIngredientsService = {

    //this function takes in an array of strings 
    //and parses them into an array of objects
    //with keys title, description, amount_str
    parseIngredientInput(inputArr) {
        console.log(inputArr)
        let formattedArr = inputArr.map(ing => {

            return ing;
        })

        // inputArr.map(ing => {
        //     console.log(ing)
        //     let ingArr = ing.split(' ')
        //     let amount_str = [ingArr.splice(0, 2)]
        //     console.log(amount_str)

        //     //typeof(char[0]) === 'number' 
        //     //&& afterNum === [
        //     //'teaspoon', 
        //     //'tablespoon', 
        //     //'cup', 
        //     //'tsp', 
        //     //'t']                
        //     return {
        //         title: 'title',
        //         description: null,
        //         amount_str: 'amount'
        //     }
        // })
        return formattedArr


    }



}

export default ParseIngredientsService;