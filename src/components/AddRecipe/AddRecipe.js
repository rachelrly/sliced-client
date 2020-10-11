import React, { Component } from 'react';
import { parseInput } from '../../services/parse-input-service'
import UserRecipesApiService from '../../services/user-recipes-api-service'
import jwt_decode from 'jwt-decode'
import cuid from 'cuid'
import TokenService from '../../services/token-service'
import UserContext from '../../user-context'
import '../Form.css';

class AddRecipe extends Component {

    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            url: '',
            ingredients: ''
        }
    }


    parseTextAreaInput = (e) => {
        const textAreaInput = e.target.value;
        const splitLine = String.fromCharCode(13, 10);
        const formattedInput = textAreaInput
            .replaceAll('\\n', splitLine)
            .split('\n')
            .map(ing => {
                return parseInput(ing)
            })


        this.setState({
            ingredients: formattedInput
        })

    }

    handleFormSubmit = (e, recipe) => {
        e.preventDefault();

        const token = TokenService.getAuthToken();
        const user_id = jwt_decode(token).user_id;

        UserRecipesApiService.createRecipe(recipe, user_id)
            .then(this.context.addRecipe(recipe))
            .then(this.props.history.push('/recipe'))
            .catch(err => console.log(err.message))


    }


    render() {
        const recipe = {
            url: this.state.url,
            title: this.state.title,
            ingredients: this.state.ingredients,
            id: cuid()
        }

        return (
            <section className='AddRecipe_section' >
                <form className='AddRecipe_form'
                    onSubmit={(e) => this.handleFormSubmit(e, recipe)}>
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
