import React, { Component } from 'react'
import { signIn, signUp } from '../todo-api.js'

export default class AuthPage extends Component {
  state = {
    signInEmail:'',
    signInPassword: '',
    signUpEmail:'',
    signUpPassword: '',
  }

  handleSignUp = async (e) => {
    e.preventDefault();
    console.log(this.state)

    const user = await signUp({
        email: this.state.signUpEmail,
        password: this.state.signUpPassword
    });

    this.props.handleToken(user.body.token);
    this.props.history.push('/');
}

handleSignIn = async (e) => {
  e.preventDefault();

  const user = await signIn({
      email: this.state.signInEmail,
      password: this.state.signInPassword
  });

  console.log('=============================\n')
  console.log('|| user.body', user.body)
  console.log('\n=============================')

  this.props.handleToken(user.body.token);
  this.props.history.push('/');
}
componentDidCatch(err, errinfo) {
  console.log('=============================\n')
  console.log('|| ', err, errinfo)
  console.log('\n=============================')
}

  render() {
    return (
      <div>
        Please Sign Up
        <form onSubmit={this.handleSignUp}>
          <label>
            email address:
            <input type="email" onChange={e => this.setState({ signUpEmail: e.target.value })} value={this.state.signUpEmail}/>
          </label>
          <label>
            password:
            <input  onChange={e => this.setState({ signUpPassword: e.target.value })} value={this.state.signUpPassword}/>
          </label>
          <button type="submit">Sign Up</button>
        </form>

        <form onSubmit={this.handleSignIn}>
          <label>
            email address:
            <input type="email" onChange={e => this.setState({ signInEmail: e.target.value })} value={this.state.signInEmail}/>
          </label>
          <label>
            password:
            <input  onChange={e => this.setState({ signInPassword: e.target.value })} value={this.state.signInPassword}/>
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    )
  }
}
