import React, { Component } from 'react';
import { parseInput } from '../../services/parse-input-service'
import UserRecipesApiService from '../../services/user-recipes-api-service'
import formatRecipeTitle from '../../services/capitalize-recipe-title-service'
import jwt_decode from 'jwt-decode'
import cuid from 'cuid'
import TokenService from '../../services/token-service'
import UserContext from '../../user-context'
import '../Form.css';
import './AddRecipe.css';
import { VscReply } from 'react-icons/vsc';


class AddRecipe extends Component {

    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            url: '',
            ingredients: '',
            error: null,
            preview: false
        }
    }


    parseTextAreaInput = (e) => {
        if (!this.state.preview) {
            this.setState({
                preview: true
            })
        }
        if (this.state.error) {
            this.setState({ error: null })
        }
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




        if (textAreaInput === '') {
            this.setState({
                preview: false
            })
        }

    }

    handleFormSubmit = (e, recipe) => {
        e.preventDefault();

        const token = TokenService.getAuthToken();
        const user_id = jwt_decode(token).user_id;

        if (!this.state.title.length || !this.state.ingredients.length) {
            this.setState({
                error: 'none'
            })
            return true;
        }

        if (!this.state.ingredients.find(ing => ing.amount_str && ing.title)) {
            this.setState({
                error: 'invalid'
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


        const previewItem = !this.state.preview ? null : this.state.ingredients.map(ing => {
            let title = ing.title ? ing.title : ' ';
            let amt = ing.amount_str ? ing.amount_str : ' ';

            return (
                <li key={cuid()} className='preview_item'>
                    <div className='col-wrapper-left'><p className='col-left'>{amt}</p></div>
                    <div className='col-wrapper-right'><p className='col-right'>{title}</p></div>
                </li>
            )
        })

        const cappedTitle = this.state.title ? formatRecipeTitle(this.state.title) : null;

        let error = this.state.error === 'none'
            ? <span className='error_text'>Recipe title and ingredients are required.</span>
            : this.state.error === 'invalid'
                ? <span className='error_text'>At least one ingredient must start with valid, scalable measurement (number) and end with ingredient's name, i.e. 2 eggs.</span>
                : null;
        let err_none = this.state.error === 'none' ? 'err' : null;
        let err_invalid = this.state.error === 'invalid' ? 'err' : err_none;

        return (
            <section className='add_section' >
                <div className='goBack_wrapper'>
                    <button
                        className='goBack round'
                        onClick={() => this.props.history.goBack()}
                        aria-label="Go back to the previous page"
                    >
                        <VscReply className='arrow round-child' />
                    </button>
                </div>
                <form className='AddRecipe_form'
                    autoComplete='off'
                    onSubmit={(e) => this.handleFormSubmit(e, recipe)}>

                    <label htmlFor='title'>Title</label>
                    <input

                        name='title'
                        type='text'
                        className={err_none}
                        onChange={(e) => this.setState({
                            title: e.target.value,
                            error: null
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
                        className={err_invalid}
                        onChange={(e) => this.parseTextAreaInput(e)}
                        placeholder={`1 1/2 cups all-purpose flour
1/2 teaspoon baking soda
1/2 teaspoon salt
10 Tablespoons unsalted butter
1/2 cup granulated sugar
1/4 cup packed light or dark brown sugar
2 Tablespoons honey or light corn syrup` } />
                    <div className='prev_wrapper'>
                        {!this.state.preview
                            ? null
                            : <>
                                <div className='preview_wrapper'>
                                    <div class='preview-title-wrapper preview-item'>
                                        <h4 className='col-left'>Amount</h4>
                                        <h4 className='col-right'>Ingredient</h4>
                                    </div>
                                    <ul>
                                        {previewItem}
                                    </ul>
                                </div>
                            </>



                        }
                    </div>
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
