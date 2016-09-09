import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

const styles = require('./Login.scss');

@connect(
  state => ({error: state.auth.loginError}),
  authActions
)
export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
    logout: PropTypes.func,
    error: PropTypes.object
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const email = this.refs.email;
    const password = this.refs.password;
    this.props.login(email.value, password.value);
  }

  render() {
    const { error } = this.props;
    return (
      <section className={styles.login}>
        <Helmet title="Login"/>
        <form className={styles.loginForm} onSubmit={this.handleSubmit}>
          <header className={styles.loginFormHeader}>
            <h3 className={styles.loginFormTitle}>Welcome back</h3>
          </header>
          <section className={styles.loginFormBody}>
            { error && <span className={styles.loginErrorMessage}>{ error.errors[0] }</span> }
            <section className={styles.loginFormInputWrapper}>
              <input
                type="email"
                ref="email"
                placeholder="Email"
                className={styles.loginFormInput}
              />
            </section>
            <section className={styles.loginFormInputWrapper}>
              <input
                type="password"
                ref="password" placeholder="Password"
                className={styles.loginFormInput}
              />
            </section>
            <button
              className={styles.loginFormSubmit}
              onClick={this.handleSubmit}>
              Log In
            </button>
          </section>
        </form>
      </section>
    );
  }
}