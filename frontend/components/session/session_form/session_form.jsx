import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(this.props.closeModal);
  }

  handleDemoSubmit(e) {
    e.preventDefault();
    this.props.processDemo({
      username: 'clickCamper',
      email: 'clickCamper@camp.site',
      password: 'password'
    }).then(this.props.closeModal);
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

  render() {
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
