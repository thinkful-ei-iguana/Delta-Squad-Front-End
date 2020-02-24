import React from 'react';
import ReactDOM from 'react-dom';
import IndividualIngredient from './IndividualIngredient';
import { BrowserRouter } from 'react-router-dom';
import renderer from "react-test-renderer";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter>
    <IndividualIngredient />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer.create(<BrowserRouter>
    <IndividualIngredient />
  </BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});