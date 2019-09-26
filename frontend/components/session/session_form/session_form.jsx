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
    this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
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

  handleDemoSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    setTimeout(() => this.props.processDemo({
      username: 'clickCamper',
      email: 'clickCamper@camp.site',
      password: 'password'
    }).then(this.props.closeModal), 1000);
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
          {/* <div class="modal-greeting"> */}
          <big>{this.props.formType}</big>
          <small>{this.props.greetingSmall}</small>
          {/* </div> */}
          {/* <small>Please {this.props.formType} or {this.props.otherForm}</small> */}
          {this.renderErrors()}
          {/* <div onClick={this.props.closeModal} className="close-x">X</div> */}
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
            <input onClick={this.handleDemoSubmit} className="demo-login-btn" type="submit" value="Demo Login" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
