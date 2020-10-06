import React, { Component } from 'react';
import ParseIngredientsService from '../../services/parse-ingredients-service'
import '../Form.css';

class AddRecipe extends Component {
    // const history = useHistory();

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            url: '',
            ingredients: ''
        }
    }

    parseIngredientLine(str) {
        let arr = str.split(' ')
        let title = ''
        let amount_str = ''
        const validTypes = [
            'tsp',
            'tbsp',
            'teaspoon',
            'teaspoons',
            'tablespoons',
            'tablespoon',
            'c',
            'cup',
            'cups'
        ]

        if (arr[0].match(/(?:[1-9][0-9]*|0)(?:\/[1-9][0-9]*)?/g)) {
            if (validTypes.find(type => type === arr[1])) {
                let noMeasurement = arr.slice(2)
                return {
                    amount_str: `${arr[0]} ${arr[1]}`,
                    title: noMeasurement.join(' '),
                    description: null
                }

            }
            let noUnit = arr.slice(1);
            return {
                amount_str: `${arr[0]}`,
                title: noUnit.join(' '),
                description: null
            }
        }

        return {
            amount_str: 'to taste',
            title: arr.join(' '),
            description: null

        }
    }

    parseTextAreaInput = (e) => {
        const textAreaInput = e.target.value;
        const splitLine = String.fromCharCode(13, 10);
        const formattedInput = textAreaInput
            .replaceAll('\\n', splitLine)
            .split('\n')
            .map(ing => {
                return this.parseIngredientLine(ing)


                //     let ingArr = ing.split(' ')
                //     let amount_str = ingArr.splice(0, 2).join(' ');
                //     let title = ingArr.join(' ')


                //     return {
                //         title,
                //         amount_str,
                //         description: null

                //     };
                // }





            })


        this.setState({
            ingredients: formattedInput
        })

    }




    render() {
        console.log(this.state.ingredients)
        const recipe = {
            url: this.state.url,
            title: this.state.title,
            ingredients: this.state.ingredients
        }

        return (
            <section className='AddRecipe_section' >
                <form className='AddRecipe_form'
                    onSubmit={
                        rec => {

                            return this.props.addRecipe(recipe)
                                .then(this.props.history.push('/recipe'))
                        }
                    }>
                    <label htmlFor='title'>Title</label>
                    <input
                        name='title'
                        type='text'
                        onChange={(e) => this.setState({
                            title: e.target.value
                        })} />

                    <label htmlFor='url'>Url (optional)</label>
                    <input
                        name='url'
                        type='text'
                        onChange={(e) => this.setState({
                            url: e.target.value
                        })} />

                    <label htmlFor='ingredients'>Ingredients</label>
                    <textarea
                        name='ingredients'
                        onChange={(e) => this.parseTextAreaInput(e)} />
                    <button
                        type='submit'
                        className='form_button'
                    >Submit</button>
                </form>
            </section >
        )
    }
}

export default AddRecipe
