import React from 'react';
import ReactDOM from 'react-dom';
import RecipePage from './RecipePage';

//before each set state test
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RecipePage match={{ params: { id: 'acb' } }} />, div);

    ReactDOM.unmountComponentAtNode(div);
})