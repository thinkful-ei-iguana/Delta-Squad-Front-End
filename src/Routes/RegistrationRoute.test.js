import React from 'react';
import ReactDOM from 'react-dom';
import RegistrationRoute from './RegistrationRoute';
import { BrowserRouter } from 'react-router-dom';
import renderer from "react-test-renderer";

it('renders without crashing', () => {
  const div = document.createElement('div');
  let history = {
    push: () => { }
  };
  let location = {
    state: {
      date: '2029-01-22T00:00:00.000Z'
    }
  };
  ReactDOM.render(<BrowserRouter>
    <RegistrationRoute history={history} location={location} />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  let history = {
    push: () => { }
  };
  let location = {
    state: {
      date: '2029-01-22T00:00:00.000Z'
    }
  };
  const tree = renderer.create(<BrowserRouter>
    <RegistrationRoute history={history} location={location} />
  </BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});