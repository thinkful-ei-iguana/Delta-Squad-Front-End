import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './LoginForm';
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
  let onLoginSuccess = () => { };

  ReactDOM.render(<BrowserRouter>
    <LoginForm history={history} location={location} onLoginSuccess={onLoginSuccess} />
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
  let onLoginSuccess = () => { };

  const tree = renderer.create(<BrowserRouter>
    <LoginForm history={history} location={location} onLoginSuccess={onLoginSuccess} />
  </BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});