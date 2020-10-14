import React from 'react';
import ReactDOM from 'react-dom';
import AddRecipe from './AddRecipe';


it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<AddRecipe />, div);

    ReactDOM.unmountComponentAtNode(div);
})