import React, { Component } from 'react';
import { parseInput } from '../../services/parse-input-service'
import UserRecipesApiService from '../../services/user-recipes-api-service'
import jwt_decode from 'jwt-decode'
import cuid from 'cuid'
import TokenService from '../../services/token-service'
import UserContext from '../../user-context'
import '../Form.css';
import './AddRecipe.css';
import { VscReply } from 'react-icons/vsc'

class AddRecipe extends Component {

    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            url: '',
            ingredients: '',
            error: false
        }
    }


    parseTextAreaInput = (e) => {
        const textAreaInput = e.target.value;
        const splitLine = String.fromCharCode(13, 10);
        const formattedInput = textAreaInput
            .replaceAll('\\n', splitLine)
            .replaceAll('-', ' ')
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

        if (!this.state.title.length || !this.state.ingredients.length) {
            this.setState({
                error: true
            })
            return true;
        }

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

        let error = this.state.error ? <span className='error_text'>Recipe title and ingredients are required.</span> : null;
        let err_class = this.state.error ? 'err' : null;
        return (
            <section className='add_section' >
                <div className='goBack_wrapper'>
                    <button
                        className='goBack'
                        onClick={() => this.props.history.push('/recipe')}
                        aria-label="Go back to the previous page"
                    >
                        <VscReply className='arrow' />
                    </button>
                </div>
                <form className='AddRecipe_form'
                    autoComplete='off'
                    onSubmit={(e) => this.handleFormSubmit(e, recipe)}>

                    <label htmlFor='title'>Title</label>
                    <input

                        name='title'
                        type='text'
                        className={err_class}
                        onChange={(e) => this.setState({
                            title: e.target.value
                        })}
                        placeholder='Crispy chocolate chip cookies' />


                    <label htmlFor='url'>Url (optional)</label>
                    <input
                        name='url'
                        type='text'
                        onChange={(e) => this.setState({
                            url: e.target.value
                        })}
                        placeholder='https://sallysbakingaddiction.com/crispy-chocolate-chip-cookies/' />

                    <label htmlFor='ingredients'>Ingredients</label>
                    <textarea
                        name='ingredients'
                        className={err_class}
                        onChange={(e) => this.parseTextAreaInput(e)}
                        placeholder={`1 1/2 cups all-purpose flour
1/2 teaspoon baking soda
1/2 teaspoon salt
10 Tablespoons unsalted butter
1/2 cup granulated sugar
1/4 cup packed light or dark brown sugar
2 Tablespoons honey or light corn syrup` } />
                    {error}
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
