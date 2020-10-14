import React from 'react';
import ReactDOM from 'react-dom';
import RecipePageIngredients from './RecipePageIngredients';


it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<RecipePageIngredients ingredients={[{ title: 'one', id: '1' }, { title: 'two', id: '2' }]} />, div);

    ReactDOM.unmountComponentAtNode(div);
})