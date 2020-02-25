import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
// import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import toJson from 'enzyme-to-json';

import LandingPage from './LandingPage';


// Enzyme.configure({ adapter: new Adapter() })


  it('should be able to run tests', () => {
      expect(1 + 2).toEqual(3);
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
      <LandingPage />
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders the UI as expected', () => {
    const tree = renderer.create(<BrowserRouter>
      <LandingPage />
    </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
    });
