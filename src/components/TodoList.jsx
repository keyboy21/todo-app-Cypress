import React from 'react';
import TodoItem from './TodoItem';
import { useDispatch, useSelector } from 'react-redux'
import { SelectTodos } from '../redux/selector';

const TodoList = () => {

	const { status, error, todos } = useSelector(SelectTodos)

	return (

		<ul className='list-group'>
			{status === 'loading' && <h2>Loading...</h2>}
			{error && <h2>Something went wrong:{error}</h2>}
			{todos.map((todo) => (
				<TodoItem id={todo.id} title={todo.title} completed={todo.completed} key={todo.id} />
			))}
		</ul>
	);
};

export default TodoList;
