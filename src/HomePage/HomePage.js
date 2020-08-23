import React, { Component } from 'react'

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to your todo list.</h1>
        To get started, login. Once you login you can manage your list. To add items to your list click the add button.
        To mark them completed click on the item.
        To delete a copmpleted item click on it again.
      </div>
    )
  }
}
