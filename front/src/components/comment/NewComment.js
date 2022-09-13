import React, { useState } from 'react';

import './NewComment.css';
import { Button } from '@material-ui/core';

/* Crate a new form component inside the comments and threaded comments */
const NewComment = ({ onCancel, isNewComment, parentId }) => {
	const [newComment, setNewComment] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setNewComment('');
		onCancel();
	};

	return (
		<form className='main_form' onSubmit={handleSubmit}>
			<textarea
				required
				className='form-control'
				rows='4'
				value={newComment}
				onChange={(e) => setNewComment(e.target.value)}
			></textarea>
			<div className='btn_div'>
				<Button
					variant='contained'
					type='submit'
					size='small'
					className='control_btn submit_button margin_btn'
				>
					Send
				</Button>
				<Button
					variant='contained'
					size='small'
					className='control_btn submit_button'
					onClick={onCancel}
				>
					Cancel
				</Button>
			</div>
		</form>
	);
};

export default NewComment;
