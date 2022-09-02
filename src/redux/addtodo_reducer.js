import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';


export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',

  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=30');
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      const data = await res.json();
      return data;

    } catch (error) {
      return rejectWithValue(error.message);
    }

  }
)

export const deleteTodos = createAsyncThunk(
  'todos/deleteTodos',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      console.log(res);
      dispatch(removeTodo({ id }));

    } catch (error) {
      return rejectWithValue(error.message);

    }
  }
)

export const toggleStatus = createAsyncThunk(
  'todos/toggleStatus',

  async (id, { rejectWithValue, dispatch, getState }) => {

    const todo = getState().todos.todos.find(todo => todo.id === id);

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          completed: !todo.completed
        })
      });
      console.log(res);
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      dispatch(toggleComplete({ id }));

    }
    catch (error) {
      return rejectWithValue(error.message);

    }
  }
)


export const addingTodo = createAsyncThunk(
  'todos/addTodo',
  async (text, { rejectWithValue, dispatch }) => {
    try {

      const todo = {
        title: text,
        userId: uuidv4(),
        completed: false,
      };
      const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      });
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      const data = await res.json();
      console.log(data);
      dispatch(createTodo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

const setError = (state, action) => {
  state.status = 'failed';
  state.error = action.error.message;
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    // addTodo: (state, action) => {
    //   state.todos = action.payload;
    // },

    createTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    },

    toggleComplete: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      todo.completed = !todo.completed;
    }
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: setError,
    [deleteTodos.rejected]: setError,
    [addingTodo.rejected]: setError,
  }
})

export const { removeTodo, toggleComplete, createTodo } = todoSlice.actions


export default todoSlice.reducer