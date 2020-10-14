import React from 'react';
import ReactDOM from 'react-dom';
import RecipeThumbnails from './RecipeThumbnails';
import { BrowserRouter } from 'react-router-dom';


it.only('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<BrowserRouter><RecipeThumbnails recipes={[{ title: 'one', id: '1' }, { title: 'two', id: '2' }]} /></BrowserRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
})