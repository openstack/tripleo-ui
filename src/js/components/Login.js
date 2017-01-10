import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Formsy from 'formsy-react';
import React from 'react';
import ReactDOM from 'react-dom';

import FormErrorList from './ui/forms/FormErrorList';
import LoginInput from './ui/forms/LoginInput';
import LoginActions from '../actions/LoginActions';
import NotificationsToaster from './notifications/NotificationsToaster';

import LogoSvg from '../../img/logo.svg';
import TripleoOwlSvg from '../../img/tripleo-owl.svg';

const messages = defineMessages({
  username: {
    id: 'Login.username',
    defaultMessage: 'username'
  },
  usernameRequired: {
    id: 'Login.usernameRequired',
    defaultMessage: 'usernameRequired'
  },
  password: {
    id: 'Login.password',
    defaultMessage: 'password'
  },
  passwordRequired: {
    id: 'Login.passwordRequired',
    defaultMessage: 'passwordRequired'
  },
  login: {
    id: 'Login.login',
    defaultMessage: 'Log In'
  },
  welcome: {
    id: 'Login.welcome',
    defaultMessage: 'Welcome to TripleO!'
  },
  description: {
    id: 'Login.description',
    defaultMessage: 'TripleO will help you manage your OpenStack deployments. It\'s the best\
                    thing since sliced bread. We think you will really enjoy it!'
  }
});

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      canSubmit: false
    };
  }
  componentWillMount() {
    ReactDOM.findDOMNode(document.documentElement).className = 'login-pf';
  }

  componentDidUpdate() {
    this.invalidateLoginForm(this.props.formFieldErrors.toJS());
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(document.documentElement).className = '';
  }

  invalidateLoginForm(formFieldErrors) {
    this.refs.form.updateInputsWithError(formFieldErrors);
  }

  _enableButton() {
    this.setState({ canSubmit: true });
  }

  _disableButton() {
    this.setState({ canSubmit: false });
  }

  handleLogin(formData, resetForm, invalidateForm) {
    const nextPath = this.props.location.query.nextPath || '/';
    const formFields = Object.keys(this.refs.form.inputs);
    this.props.dispatch(
      LoginActions.authenticateUser(formData, formFields, nextPath)
    );
  }

  render() {
    return (
      <div>
        <span id="badge">
          <img src={LogoSvg} alt="TripleO"></img>
        </span>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div id="brand">
                <img src={TripleoOwlSvg} alt="TripleO"></img>
              </div>
            </div>
            <div className="col-sm-7 col-md-6 col-lg-5 login">
              <FormErrorList errors={this.props.formErrors.toJS()}/>
              <Formsy.Form ref="form"
                   role="form"
                   className="form-horizontal"
                   onSubmit={this.handleLogin.bind(this)}
                   onValid={this._enableButton.bind(this)}
                   onInvalid={this._disableButton.bind(this)}>
                <LoginInput
                    name="username"
                    placeholder={this.props.intl.formatMessage(messages.username)}
                    title={this.props.intl.formatMessage(messages.username)}
                    validationError={this.props.intl.formatMessage(messages.usernameRequired)}
                    required
                    autoFocus
                />
                <LoginInput type="password"
                    name="password"
                    placeholder={this.props.intl.formatMessage(messages.password)}
                    title={this.props.intl.formatMessage(messages.password)}
                    validationError={this.props.intl.formatMessage(messages.passwordRequired)}
                    required
                />
                <div className="form-group">
                  <div className="col-xs-offset-8 col-xs-4 col-sm-4 col-md-4 submit">
                    <button type="submit"
                            disabled={!this.state.canSubmit || this.props.isAuthenticating}
                            className="btn btn-primary btn-lg"
                            tabIndex="4"
                            id="Login__loginButton"
                    >
                      <FormattedMessage {...messages.login}/>
                    </button>
                  </div>
                </div>
              </Formsy.Form>
            </div>
            <div className="col-sm-5 col-md-6 col-lg-7 details">
              <p>
                <strong><FormattedMessage {...messages.welcome}/></strong><br/>
                <FormattedMessage {...messages.description}/>
              </p>
            </div>
          </div>
        </div>
        <NotificationsToaster />
      </div>
    );
  }
}
Login.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  formErrors: ImmutablePropTypes.list.isRequired,
  formFieldErrors: ImmutablePropTypes.map.isRequired,
  intl: React.PropTypes.object,
  isAuthenticating: React.PropTypes.bool.isRequired,
  location: React.PropTypes.object,
  userLoggedIn: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    formErrors: state.login.getIn(['loginForm', 'formErrors']),
    formFieldErrors: state.login.getIn(['loginForm', 'formFieldErrors']),
    userLoggedIn: state.login.hasIn(['keystoneAccess', 'user']),
    isAuthenticating: state.login.get('isAuthenticating')
  };
}

export default connect(mapStateToProps)(injectIntl(Login));
