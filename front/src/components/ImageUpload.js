import React, { useState } from 'react';
import { storage } from '../util/firebase';
import './ImageUpload.css';
import {
	Button,
	TextField,
	InputLabel,
	FormControl,
	Select,
} from '@material-ui/core';
import axios from '../util/axios';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const ImageUpload = ({ username }) => {
	const [image, setImage] = useState(null);
	const [url, setUrl] = useState('none');
	const [progress, setProgress] = useState(0);
	const [caption, setCaption] = useState('');
	const [description, setDescription] = useState('');
	const [visible, setVisible] = useState(false);
	const [isdisabled, setisdisabled] = useState(false);
	const [sendUser, setSendUser] = useState(username);

	const handleUserChange = (e) => {
		setSendUser(e.target.value);
	};

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const handleUpload = () => {
		setisdisabled(true);
		if (caption && description) {
			if (image) {
				const uploadTask = storage
					.ref(`images/${image.name}`)
					.put(image);
				uploadTask.on(
					'state_changed',
					(snapshot) => {
						// progress function ...
						const progress = Math.round(
							(snapshot.bytesTransferred / snapshot.totalBytes) *
								100
						);
						setProgress(progress);
					},
					(error) => {
						// Error function ...
						console.log(error);
					},
					() => {
						// complete function ...
						storage
							.ref('images')
							.child(image.name)
							.getDownloadURL()
							.then((url) => {
								console.log('object');
								axios.post('/upload', {
									timestamp: Date.now(),
									caption: caption,
									user: sendUser,
									Image: url,
									description: description,
								});
								setProgress(0);
								setCaption('');
								setDescription('');
								setImage(null);
								setVisible(false);
								setisdisabled(false);
							});
					}
				);
			} else {
				console.log('no object');
				axios.post('/upload', {
					timestamp: Date.now(),
					caption: caption,
					user: sendUser,
					Image: url,
					description: description,
				});
				setProgress(0);
				setCaption('');
				setDescription('');
				setImage(null);
				setVisible(false);
				setisdisabled(false);
			}
		} else {
			alert('Please fill all required Inputs.');
		}
	};

	return (
		<>
			{visible ? (
				<div className='imageupload'>
					{progress ? (
						<progress
							className='imageupload__progress'
							value={progress}
							max='100'
						/>
					) : (
						''
					)}

					<div className='upload_div'>
						<FormControl fullWidth required variant='outlined'>
							<InputLabel htmlFor='outlined-age-native-simple'>
								Sender
							</InputLabel>
							<Select
								native
								value={sendUser}
								onChange={handleUserChange}
								label='User'
								inputProps={{
									name: 'User',
								}}
							>
								<option value={username}>{username}</option>
								<option value={'Anonymous'}>Anonymous</option>
							</Select>
						</FormControl>

						<TextField
							id='outlined-full-width'
							label='Title'
							fullWidth
							required
							disabled={isdisabled}
							value={caption}
							onChange={(e) => setCaption(e.target.value)}
							margin='normal'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
						/>

						<TextField
							id='outlined-multiline-static'
							label='Description'
							multiline
							fullWidth
							required
							disabled={isdisabled}
							rows={4}
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className='control_btns'>
						<Button
							disabled={isdisabled}
							variant='contained'
							size='large'
							onClick={handleUpload}
						>
							POST
						</Button>

						<Button
							variant='contained'
							size='large'
							disabled={isdisabled}
							onClick={() => setVisible(false)}
						>
							CANCEL
						</Button>

						<input
							accept='image/*'
							style={{ display: 'none' }}
							id='raised-button-file'
							multiple
							type='file'
							onChange={handleChange}
						/>
						<label htmlFor='raised-button-file'>
							<Button
								variant='contained'
								size='large'
								component='span'
								className='control_btn_image'
								disabled={isdisabled}
							>
								Add Image
							</Button>
						</label>
					</div>
				</div>
			) : (
				<div className='control_post_btn_div'>
					<Button
						className='control_post_btn'
						onClick={() => setVisible(true)}
						variant='contained'
						size='large'
					>
						Create Buzz{' '}
						<TrendingUpIcon className='control_post_btn_icon' />
					</Button>
				</div>
			)}
		</>
	);
};

export default ImageUpload;
