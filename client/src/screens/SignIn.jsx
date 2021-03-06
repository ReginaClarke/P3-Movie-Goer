import React, { Component } from 'react'
import { signInUser } from '../services/auth'
import '../styles/landing.css'
import { Link } from 'react-router-dom'

class SignIn extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      isError: false,
      errorMsg: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      isError: false,
      errorMsg: ''
    })
  }

  onSignIn = event => {
    event.preventDefault()

    const { history, setUser } = this.props

    signInUser(this.state)
      .then(res => setUser(res.user))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({
          isError: true,
          errorMsg: 'Invalid Credentials',
          username: '',
          password: ''
        })
      })
  }

  renderError = () => {
    const toggleForm = this.state.isError ? 'danger' : ''
    if (this.state.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {this.state.errorMsg}
        </button>
      )
    } else {
      return <button type="submit">Sign In</button>
    }
  }

  render() {
    const { username, password } = this.state

    return (
      <div className="row">
        <div className="form-container">
          <h3>Sign In</h3>
          <form onSubmit={this.onSignIn} className="signIn">
            <input className="signIn"
              required
              type="text"
              name="username"
              value={username}
              placeholder="Enter Username Here"
              onChange={this.handleChange}
            />
            <input className="signIn"
              required
              name="password"
              value={password}
              type="password"
              placeholder="Enter Password Here"
              onChange={this.handleChange}
            />
            {this.renderError()}
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </form>
        </div>
      </div>
    )
  }
}

export default SignIn