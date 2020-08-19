import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link
} from 'react-router-dom';

import './App.css';
import AuthPage from './AuthPage/AuthPage.js';
import ListPage from './ListPage/ListPage';

export default class App extends Component {

state = {
  token: localStorage.getItem('TOKEN')
}
handleToken = (token) => {
  // we have it in state so that the DOM automatically updates in response to changes
  this.setState({ token: token })

  // prevents having to login every time we make a change in react
  localStorage.setItem('TOKEN', token)
}

clearToken = () => {
  // we CLEAR it in state so that the DOM automatically updates in response to changes
  this.setState({ token: '' })

  localStorage.setItem('TOKEN', '')
}

  render() {
    return (
      <div className="App">
        <Router>
          <header>
            {
              this.state.token &&
              <>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              </>
            }
          </header>
          <Switch>
          <Route
              path="/" 
              exact
              render={(routerProps) => <ListPage token={this.state.token} {...routerProps} />} 

            />
            <Route
              path="/login" 
              exact
              render={(routerProps) => <AuthPage token={this.state.token}  handleToken={this.handleToken} {...routerProps} />} 

            />
          </Switch>


        </Router>
        
      </div>
    )
  }
}

