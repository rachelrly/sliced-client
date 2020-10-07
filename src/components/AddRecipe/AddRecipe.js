import React, { Component } from 'react';
import { parseInput } from '../../services/parse-input-service'
import '../Form.css';

class AddRecipe extends Component {


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




    render() {
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
