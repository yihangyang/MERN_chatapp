import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../../actions/user_actions'


class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: ["4","2"]
  }
  
  displayErrors = errors => {
    errors.map((error, i) => <p key={i}>{ error }</p>)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()

    let dataToSubmit = {
      email: this.state.email,
      password: this.state.password
    }
    
    if (this.isFormvalid(this.state)) {
      this.setState({ errors: [] })
      this.props.dispatch(loginUser(dataToSubmit))
        .then(res =>{
          console.log(res)
          if(res.payload.loginSuccess) {
            this.props.history.push('/')
          } else { // fail to login
            this.setState({
              errors: this.state.errors.concat(
                "Failed to login, Email or Password not correct"
              )
            })
            console.log(this.state.errors)
          }
        })
    } else {
      this.setState({
        errors: this.state.errors.concat(
          "Form is not valid"
        )
      })
    }
  }

  isFormvalid = ({ email, password }) => email && password
  


  render() {
    return (
      <div className="container">
        <h2>Log in</h2>
        <div className="row">
          <form className="col s12" onSubmit={event => this.submitForm(event)}>
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

            {this.state.errors.length && (
              <div>
                { this.displayErrors(this.state.errors) }
              </div>
            )}

            <div className="row">
              <div className="col s12">
                <button
                  className="btn waves-effect red lighten-2"
                  type="submit"
                  name="action"
                  onClick={this.submitForm}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Login)