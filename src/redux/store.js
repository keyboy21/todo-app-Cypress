import { configureStore } from '@reduxjs/toolkit';
import addTodoStore from './addtodo_reducer'

export default configureStore({
  reducer: {
    todos: addTodoStore
  },
})
