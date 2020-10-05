import React from 'react';

import '../Form.css';

function AddRecipe() {
    return (
        <section className='Login_section'>
            <form className='Login_form'>
                <label htmlFor='title'>Title</label>
                <input name='title' type='text' />

                <label htmlFor='url'>Url (optional)</label>
                <input name='url' type='text' />

                <label htmlFor='ingredients'>Ingredients</label>
                <textarea name='ingredients' />
                <button type='submit' className='form_button'>Submit</button>
            </form>
        </section>
    )
}

export default AddRecipe
