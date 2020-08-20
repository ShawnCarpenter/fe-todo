import request from 'superagent'

const URL = process.env.REACT_APP_API_URL;

export function signUp(userData) {
  try {
    console.log(userData)
      return request.post(`${URL}/auth/signup`, userData);
  } catch(e) {
      return { error: e.message }
  }
}

export function signIn(userData) {
  try {
    return request.post(`${URL}/auth/signin`, userData);
} catch(e) {
    return { error: e.message }
}
}

export function fetchTodos() {
  const token = localStorage.getItem('TOKEN')
  try{
      return request
          .get(`${URL}/api/todos`)
          .set('Authorization', token);
  } catch(e) {
      return { error: e.message }
  }
}

export function addTodo(newTodo) {
  const token = localStorage.getItem('TOKEN')
  try{
      return request
          .post(`${URL}/api/todos`, newTodo)
          .set('Authorization', token);
  } catch(e) {
      return { error: e.message }
  }
}

export function completeTodo(completedTodo) {
  const token = localStorage.getItem('TOKEN')
  const id = completedTodo.id;
  try{
      return request
          .put(`${URL}/api/todos/${id}`, completedTodo)
          .set('Authorization', token);
  } catch(e) {
      return { error: e.message }
  }
}

export function deleteTodo(deleteTodo) {
  const token = localStorage.getItem('TOKEN')
  const id = deleteTodo.id;
  try{
      return request
          .delete(`${URL}/api/todos/${id}`)
          .set('Authorization', token);
  } catch(e) {
      return { error: e.message }
  }
}