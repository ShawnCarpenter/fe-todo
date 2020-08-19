import React, { Component } from 'react'
import { fetchTodos, addTodo } from '../todo-api.js'

export default class ListPage extends Component {
  
  state= {
    todos: [],
    add:false,
    newTodo: ''
  }
  addButtonHandler = async e => {
    if(this.state.add) {
      const newTodo = {
        todo:this.state.newTodo,
        completed:false
      }
      const data= await addTodo(newTodo)
      console.log(data.body);
      const newTodos = this.state.todos.concat(data.body);
      this.setState({todos:newTodos})


    } else this.setState({add:true})
  }
  newTodoHandler = e => {
    this.setState({newTodo:e.target.value})
  }
  componentDidMount = async () => {
    if (!this.props.token) {
      this.props.history.push('/login');
    } else {
      const data = await fetchTodos(this.props.token)
  
      this.setState({
        todos: data.body
      })
    }

  }

  render() {
    return (
      <>
      <ul>
        {
          this.state.todos && this.state.todos.map(todo => <li key={todo.id}>{todo.todo}</li>)
        }
        
      </ul>
      {
        this.state.add && <input onChange={this.newTodoHandler} value={this.state.newTodo} />
      }
      <button onClick={this.addButtonHandler}>Add</button>
      </>
    )
  }
}
