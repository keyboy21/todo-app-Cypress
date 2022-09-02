import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodos, toggleStatus } from '../redux/addtodo_reducer'

const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch()

	const togglecomplete = () => {
		dispatch(toggleStatus(id))
	}

	const remTodo = () => {
		dispatch(deleteTodos(id))
	}
	return (
		<li className={`list-group-item ${completed && 'list-group-item-danger'}`}>
			<div className='d-flex justify-content-between'>
				<span className={completed ? "d-flex align-items-center completed" : "d-flex align-items-center"}>
					<input type='checkbox' className='mr-3' id="input"
						defaultChecked={completed}
						onChange={togglecomplete}>
					</input>
					{title}
				</span>
				<button className='btn btn-danger'onClick={remTodo}>Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
