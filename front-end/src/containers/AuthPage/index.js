/**
 *
 * AuthPage
 *
 */
 import { retrieveProfile } from "../../conection/profile/actions";

import React from 'react';
import PropTypes from 'prop-types';
import { findIndex, get, map, replace, set } from 'lodash';
import { Link } from 'react-router-dom';

import FormDivider from '../../components/Login/FormDivider';
import Input from '../../components/Login/InputsIndex';
import SocialLink from '../../components/Login/SocialLink';

// Utils
import auth from '../../utils/auth';
import request from '../../utils/request';
import { addUser } from '../../conection/profile/actions';

import form from './forms.json';
import './styles.css';
import { connect } from 'react-redux';

class AuthPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user: null,
    }
  }

  state = { value: {}, errors: [], didCheckErrors: false };




  componentDidMount() {
    this.generateForm(this.props);
    this.props.retrieveProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      this.setState({ user: this.props.user });
      console.log(this.props.user);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.authType !== this.props.match.params.authType) {
      this.generateForm(nextProps);
    }
  }

  getRequestURL = () => {
    let requestURL;

    switch (this.props.match.params.authType) {
      case 'login':
        requestURL = process.env.REACT_APP_SERVER_URL+'/api/auth/local';
        break;
      case 'reset-password':
        requestURL = process.env.REACT_APP_SERVER_URL+'/api/auth/reset-password';
        break;
      case 'forgot-password':
        requestURL = process.env.REACT_APP_SERVER_URL+'/api/auth/forgot-password';
        break;
      default:
    }

    return requestURL;
  };

  generateForm = props => {
    const params = props.location.search
      ? replace(props.location.search, '?code=', '')
      : props.match.params.id;
    this.setForm(props.match.params.authType, params);
  };

  handleChange = ({ target }) =>
    this.setState({
      value: { ...this.state.value, [target.name]: target.value },
    });

  handleSubmit = e => {
    e.preventDefault();
    const body = this.state.value;
    const requestURL = this.getRequestURL();

    // This line is required for the callback url to redirect your user to app
    if (this.props.match.params.authType === 'forgot-password') {
      set(body, 'url', process.env.REACT_APP_APP_URL + '/auth/reset-password');
    }

    request(requestURL, { method: 'POST', body: this.state.value })
      .then(response => {
        auth.setToken(response.jwt, body.rememberMe);
        auth.setUserInfo(response.user, body.rememberMe);
        auth.setHeaderAuthorization(response.jwt);
        this.props.addUser(response.user)
        this.redirectUser();
      })
      .catch(err => {
        // TODO handle errors for other views
        // This is just an example
        const errors = [
          { name: 'identifier', errors: ['Email ou password errada'] },
        ];
        this.setState({ didCheckErrors: !this.state.didCheckErrors, errors });
      });
  };

  redirectUser = () => {
    this.props.history.push('/dashboard');
  };

  /**
   * Function that allows to set the value to be modified
   * @param {String} formType the auth view type ex: login
   * @param {String} email    Optionnal
   */
  setForm = (formType, email) => {
    const value = get(form, ['data', formType], {});

    if (formType === 'reset-password') {
      set(value, 'code', email);
    }
    this.setState({ value });
  };

  /**
   * Check the URL's params to render the appropriate links
   * @return {Element} Returns navigation links
   */
  renderLink = () => {
    if (this.props.match.params.authType === 'login') {
      return (
        <></>
      );
    }

  };

  render() {
    const divStyle =
      this.props.match.params.authType === 'register'
        ? { marginTop: '3.2rem' }
        : { marginTop: '.9rem' };
    const inputs = get(form, ['views', this.props.match.params.authType]);
    const providers = []; // To remove a provider from the list just delete it from this array...

    return (
      <div>
      <div className="authPage">
        <div className="wrapper">
          <div className="headerContainer">
            {this.props.match.params.authType === 'register' ? (
              <span>Bem Vindo !</span>
            ) : (
              <h1>Login</h1>
            )}
          </div>
          <div className="headerDescription">
            {this.props.match.params.authType === 'register' ? (
              <span>Por favor registe para poder ter acesso as informações</span>
            ) : (
              ''
            )}
          </div>
          <div className="formContainer" style={divStyle}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  {providers.map(provider => (
                    <SocialLink provider={provider} key={provider} />
                  ))}
                </div>
              </div>
              <FormDivider />
              <form onSubmit={this.handleSubmit}>
                <div className="row" style={{ textAlign: 'start' }}>
                  {map(inputs, (input, key) => (
                    <Input
                      autoFocus={key === 0}
                      customBootstrapClass={get(input, 'customBootstrapClass')}
                      didCheckErrors={this.state.didCheckErrors}
                      errors={get(
                        this.state.errors,
                        [
                          findIndex(this.state.errors, ['name', input.name]),
                          'errors',
                        ],
                        []
                      )}
                      key={get(input, 'name')}
                      label={get(input, 'label')}
                      name={get(input, 'name')}
                      onChange={this.handleChange}
                      placeholder={get(input, 'placeholder')}
                      type={get(input, 'type')}
                      validations={{ required: true }}
                      value={get(this.state.value, get(input, 'name'), '')}
                    />
                  ))}
                  <div className="col-md-12 buttonContainer">
                    
                    <input class="btn btn-primary" type="submit" value="Sign in" style={{ width: '100%' }}/>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="linkContainer">{this.renderLink()}</div>
        </div>
      </div>
      </div>
    );
  }
}

AuthPage.defaultProps = {};
AuthPage.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  user: state.users,
});

export default connect(mapStateToProps, { addUser,
  retrieveProfile, })(AuthPage);
