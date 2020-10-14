import React from 'react';
import ReactDOM from 'react-dom';
import Ingredient from './Ingredient';


it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Ingredient />, div);

    ReactDOM.unmountComponentAtNode(div);
})