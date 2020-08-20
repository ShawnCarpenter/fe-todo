import React, { Component } from 'react'
import { fetchTodos, addTodo, completeTodo, deleteTodo } from '../todo-api.js'
import './ListPage.css'

export default class ListPage extends Component {
  
  state= {
    todos: [],
    add:false,
    newTodo: ''
  }
  updateTodos = async () => {
    const data = await fetchTodos(this.props.token)
  
      this.setState({
        todos: data.body
      })
  };
  addButtonHandler = async e => {
    if(this.state.add) {
      const newTodo = {
        todo:this.state.newTodo,
        completed:false
      }
      const data= await addTodo(newTodo)
      console.log(data.body);
      this.updateTodos();
      this.setState({add:false})


    } else this.setState({add:true})
  }
  newTodoHandler = e => {
    this.setState({newTodo:e.target.value})
  }

  handleItemClick = async (clickedTodo) => {
    if (clickedTodo.completed === false) {
      clickedTodo.completed = true;
      await completeTodo(clickedTodo)
    } else {
      await deleteTodo(clickedTodo)
    }
    this.updateTodos();

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
      <div>
      <ul>
        {
          this.state.todos && this.state.todos.map(todo => <li key={todo.id} className={todo.completed ? 'completed': 'active'} onClick={() => this.handleItemClick(todo)}>{todo.todo}</li>)
        }
        
      </ul>
      <button onClick={this.addButtonHandler}>Add</button>
      {
        this.state.add && <input onChange={this.newTodoHandler} value={this.state.newTodo} />
      }
      </div>
    )
  }
}
