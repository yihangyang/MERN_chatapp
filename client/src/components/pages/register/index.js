import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../../actions/user_actions'
import { Link } from 'react-router-dom'

class Register extends Component {
  state = {
    lastname: "",
    name: "",
    email: "",
    password: "",
    passwordComfirmation: '',
    errors: [],
  }
  
  displayErrors = errors => errors.map((error, i) => <p key={i}>{ error }</p>)
  

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    
    let dataToSubmit = {
      lastname: this.state.lastname,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordComfirmation: this.state.passwordComfirmation
    }
    
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [] })
      this.props.dispatch(registerUser(dataToSubmit))
        .then(res =>{
          console.log(res)
          if(res.payload.registerSuccess) {
            this.props.history.push('/login')
          } else { // fail to login
            this.setState({
              errors: this.state.errors.concat(
                "Failed to register, something not correct"
              )
            })
          }
        })
        .catch(err => {
          this.setState({
            errors: this.state.errors.concat(err)
          })
        })
    } else {
      console.error("Form is not valid")
    }
  }

  isNotEmpty = ({
    lastname, name, email, password, passwordComfirmation
  }) => lastname && name && email && password && passwordComfirmation

  isFormValid = () => {
    let errors = []
    let error

    if (!this.isNotEmpty(this.state)) {
      error = { message: "Fill in all fields"}
      this.setState({ errors: errors.concat(error)})
    } else if(!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid"}
      this.setState({ errors: errors.concat(error)})
    } else {
      return true
    }
  }

  isPasswordValid =({ password, passwordComfirmation }) => {
    if (password.length < 6 || passwordComfirmation.length < 6) {
      return false
    } else if (password !== passwordComfirmation) {
      return false
    } else {
      return true
    }
  }
  
  render() {
    return (
      <div className="container">
        <h2>Register</h2>
        <div className="row">
          <form className="col s12" onSubmit={event => this.submitForm(event)}>
          <div className="row">
              <div className="input-field col s12">
                <input
                  name="lastname"
                  value={this.state.lastname}
                  onChange={e => this.handleChange(e)}
                  id="lastname"
                  type="text"
                  className="validate"
                /> 
                <label htmlFor="lastname">Lastname</label>
                <span
                  className="helper-text"
                  data-error="invalidated lastname"
                  data-success="validated lastname"
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="name"
                  value={this.state.name}
                  onChange={e => this.handleChange(e)}
                  id="name"
                  type="text"
                  className="validate"
                /> 
                <label htmlFor="name">Name</label>
                <span
                  className="helper-text"
                  data-error="invalidated name"
                  data-success="validated name"
                />
              </div>
            </div>
            
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="email"
                  value={this.state.email}
                  onChange={e => this.handleChange(e)}
                  id="email"
                  type="email"
                  className="validate"
                /> 
                <label htmlFor="email">Email</label>
                <span
                  className="helper-text"
                  data-error="invalidated email"
                  data-success="validated email"
                />
              </div>
            </div>
            

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="password"
                  value={this.state.password}
                  onChange={e => this.handleChange(e)}
                  id="password"
                  type="password"
                  className="validate"
                />
                <label htmlFor="password">Password</label>
                <span
                  className="helper-text"
                  data-error="invalidated password"
                  data-success="validated password"
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="passwordComfirmation"
                  value={this.state.passwordComfirmation}
                  onChange={e => this.handleChange(e)}
                  id="passwordComfirmation"
                  type="password"
                  className="validate"
                /> 
                <label htmlFor="passwordComfirmation">Password Comfirmation</label>
                <span
                  className="helper-text"
                  data-error="invalidated passwordComfirmation"
                  data-success="validated passwordComfirmation"
                />
              </div>
            </div>

            {this.state.errors.length > 0 && (
              <div className="row">
                { this.displayErrors(this.state.errors) }
              </div>
            )}

            <div className="row">
              <div className="col s12 center">
                <button
                  className="btn waves-effect red lighten-2"
                  type="submit"
                  name="action"
                  onClick={this.submitForm}
                >
                  Create Account
                </button> &nbsp;
                <Link to="/login">
                  <button
                    className="btn waves-effect red lighten-2"
                    type="submit"
                    name="action"
                  >
                    Log in
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect()(Register)
