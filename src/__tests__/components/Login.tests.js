import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import Login from '../../js/components/Login';
import LoginActions from '../../js/actions/LoginActions';

let loginInstance;

describe('Login component', () => {
  describe('When user is not logged in', () => {
    beforeEach(() => {
      loginInstance = ReactTestUtils.renderIntoDocument(<Login/>);
    });

    xit('should render with expected markup', () => {
      expect(ReactTestUtils.isCompositeComponent(loginInstance)).toBeTruthy();

      let inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(loginInstance, 'input');
      expect(inputs.length).toBe(2);
      expect(inputs[0].id).toBe('username');
      expect(inputs[1].id).toBe('password');

      let submitButton = ReactTestUtils.findRenderedDOMComponentWithTag(loginInstance, 'button');
      expect(submitButton.textContent).toBe('Log In');
      expect(submitButton.type).toBe('submit');
    });

    xit('updates the component state when user fills the form', function() {
      let inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(loginInstance, 'input');
      ReactTestUtils.Simulate.change(inputs[0], { target: { value: 'myusername' }});
      ReactTestUtils.Simulate.change(inputs[1], { target: { value: 'somepassword' }});
      expect(loginInstance.state.username).toEqual('myusername');
      expect(loginInstance.state.password).toEqual('somepassword');
    });

    xit('should handle the login when user submits the login form', () => {
      let loginForm = ReactTestUtils.findRenderedDOMComponentWithTag(loginInstance, 'form');
      ReactTestUtils.Simulate.submit(loginForm);
      expect(LoginActions.authenticateUser).toBeCalled();
    });
  });

  describe('When user is logged in', () => {
    xit('redirects to nextPath when user is logged in and visits login page', () => {
      loginInstance = new Login();
      loginInstance.context = {
        router: {
          getCurrentQuery() {
            return {
              nextPath: 'nodes'
            };
          }
        }
      };
      // loginInstance.context.router.transitionTo = jest.genMockFunction();
      loginInstance.componentWillMount();
      expect(loginInstance.context.router.transitionTo).toBeCalledWith('nodes');
    });
  });
});
