import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
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

    parseTextAreaInput(e) {
        const textAreaInput = e.target.value;
        const splitLine = String.fromCharCode(13, 10);
        const formattedInput = textAreaInput.replaceAll('\\n', splitLine)
        this.setState({
            ingredients: formattedInput
        })
    }


    render() {

        const ingredients = [
            {
                title: this.state.title,
                description: 'this is a description',
                amount_str: '1 TBSP'
            },
            {
                title: this.state.title,
                description: 'this is a second description',
                amount_str: '1 tsp'
            },
            {
                title: this.state.title,
                description: 'this is a third description',
                amount_str: '1/2 Cup'
            },
        ]

        const recipe = {
            url: this.state.url,
            title: this.state.title,
            ingredients
        }


        return (
            <section className='AddRecipe_section' >
                <form className='AddRecipe_form'>
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
                        onClick={
                            rec => this.props.addRecipe(recipe)
                                .then(this.props.history.push('/recipe'))
                        }>Submit</button>
                </form>
            </section>
        )
    }
}

export default AddRecipe
