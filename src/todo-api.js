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