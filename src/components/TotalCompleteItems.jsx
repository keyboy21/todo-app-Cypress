import React from 'react';
import { useSelector } from 'react-redux'

const TotalCompleteItems = () => {
	const check = useSelector(state => state.todos.todos)

	const totalCompleteItems = check.filter(item => item.completed === true).length

	return <h4 className='mt-3'>Total Complete Items:{totalCompleteItems}</h4>;
};

export default TotalCompleteItems;
