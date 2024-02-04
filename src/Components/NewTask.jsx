import React, { useState } from 'react';

const NewTask = ({ onAdd }) => {
	const [enteredTask, setEnteredTask] = useState('');

	const handleClick = () => {
		if (enteredTask.trim() === '') {
			return;
		}
		onAdd(enteredTask);
		setEnteredTask('');
	};

	const handleChange = (e) => {
		setEnteredTask(e.target.value);
	};
	return (
		<div className='flex items-center justify-between'>
			<input
				type='text'
				className='w-64 px-2 py-1 rounded-sm bg-stone-200'
				value={enteredTask}
				onChange={handleChange}
			/>
			<button
				onClick={handleClick}
				className='text-stone-700 hover:text-red-950'
			>
				Add Task
			</button>
		</div>
	);
};

export default NewTask;
