import React from 'react';
import ReactDOM from 'react-dom';
import RecipeThumbnails from './RecipeThumbnails';


it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<RecipeThumbnails />, div);

    ReactDOM.unmountComponentAtNode(div);
})