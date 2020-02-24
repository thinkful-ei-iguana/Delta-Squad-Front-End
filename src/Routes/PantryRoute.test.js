import React from 'react';
import ReactDOM from 'react-dom';
import PantryRoute from './PantryRoute';
import { BrowserRouter } from 'react-router-dom';
import renderer from "react-test-renderer";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter>
    <PantryRoute />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer.create(<BrowserRouter>
    <PantryRoute />
  </BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});