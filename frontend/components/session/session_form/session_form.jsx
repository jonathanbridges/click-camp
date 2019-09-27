import React from 'react';
import { withRouter } from 'react-router-dom';
import PulseLoaderAnimation from '../../loader/pulse_loader'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginDemoUser = this.loginDemoUser.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.setState({ loading: true });
    setTimeout(() => this.props.processForm(user)
      .then(this.props.closeModal)
      .catch(this.setState({
        loading: false
      })), 1000);
  }

  loginDemoUser(e) {
    e.preventDefault();

    // initialize empty state
    this.setState({
      username: '',
      email: '',
      password: ''
    });

    // hardcode demo credentials
    let uN = 'clickCamper';
    let eM = 'clickCamper@camp.site'
    let pW = 'password'

    // update state inside of helper functions until all fields are filled

    const usernameCallback = () => {
      setTimeout(() => {
        if (uN.length > 0) {
          this.setState({
            username: this.state.username.concat(uN[0]),
            email: this.state.email,
            password: this.state.password
          });
          uN = uN.slice(1);
          usernameCallback();
        } else {
          setTimeout(() => emailCallback(), 150);
        }
      }, Math.floor(Math.random() * (1 + 150 - 50)) + 50);
    }

    const emailCallback = () => {
      setTimeout(() => {
        if (eM.length > 0) {
          this.setState({
            username: this.state.username,
            email: this.state.email.concat(eM[0]),
            password: this.state.password
          });
          eM = eM.slice(1);
          emailCallback()
        } else {
          setTimeout(() => pwCallback(), 100);
        }
      }, Math.floor(Math.random() * (1 + 100 - 10)) + 10);
    }

    const pwCallback = () => {
      setTimeout(() => {
        if (pW.length > 0) {
          this.setState({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password.concat(pW[0])
          });
          pW = pW.slice(1);
          pwCallback()
        } else {
          this.setState({ loading: true });
          debugger;
          setTimeout(() => {
            const user = Object.assign({}, this.state);
            this.props.processDemo(user)
              .then(this.props.closeModal);
          }, 1000);
        }
      }, Math.floor(Math.random() * (1 + 100 - 10)) + 10);
    }

    usernameCallback();
  }

  renderErrors() {
    return (
      <ul className="errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  componentWillUnmount() {
    this.props.clearErrors();
    this.setState({ loading: false });
  }

  render() {

    if (this.state.loading) {
      return (
        <div className='loader-modal'>
          <PulseLoaderAnimation loading={this.state.loading} />
        </div>
      );
    }
    
    return (
      <div className="login-form-container">
        <form className="login-form-box">
          <big>{this.props.formType}</big>
          <small>{this.props.greetingSmall}</small>
          {this.renderErrors()}
          <div className="login-form">
            <input type="text"
              value={this.state.username}
              onChange={this.update('username')}
              className="login-input"
              placeholder="Username..."
            />
            <br />
            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
              className="login-input"
              placeholder="Email address..."
            />
            <br />
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              className="login-input"
              placeholder="Password..."
            />
            <br />
            <input onClick={this.handleSubmit} className="btn-main" type="submit" value={this.props.formType} />
            <br />
            <input onClick={this.loginDemoUser} className="demo-login-btn" type="submit" value="Demo Login" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
