import React, { useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import './Login.css';
import firebase from 'firebase';

function Signup(props) {
	const history = useHistory();
	const signUpGoogle = () => {
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				var user = result.user;
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	};

	useEffect(() => {
		if (props.user) {
			history.push('/login');
		}
	}, [props.user]);

	return (
		<div className='main_login_div'>
			<div className='form_div'>
				<form className='app__login'>
					<div className='form_header'>
						<h1>Trendd</h1>
						<h3>Modern way to discuss</h3>
					</div>
					<TextField
						id='outlined-multiline-static'
						label='Name'
						required
						InputLabelProps={{
							shrink: true,
						}}
						variant='outlined'
						value={props.username}
						onChange={(e) => props.setUsername(e.target.value)}
					/>
					<TextField
						id='outlined-multiline-static'
						label='Email'
						required
						InputLabelProps={{
							shrink: true,
						}}
						variant='outlined'
						value={props.email}
						onChange={(e) => props.setEmail(e.target.value)}
					/>
					<TextField
						id='outlined-multiline-static'
						label='Password'
						required
						InputLabelProps={{
							shrink: true,
						}}
						variant='outlined'
						type='password'
						value={props.password}
						onChange={(e) => props.setPassword(e.target.value)}
					/>
					<Button
						className='control_botton'
						onClick={props.handleRegister}
					>
						Register
					</Button>
					<span className='google_btn_span'>
						<Button
							className='google_btn'
							size='large'
							onClick={() => signUpGoogle()}
						></Button>
					</span>
					<Link className='link_option' to='login'>
						<Button size='large'>Login</Button>
					</Link>
				</form>
			</div>
		</div>
	);
}

export default Signup;
