import React, { useState, useEffect } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import { auth } from './util/firebase';
import { Button, Avatar } from '@material-ui/core';
import FlipMove from 'react-flip-move';
import axios from './util/axios';
import Pusher from 'pusher-js';
import { HashRouter, Route, Link } from 'react-router-dom';
import Posts from './components/Posts';
import Post from './components/Post';
import Login from './components/Login';
import Signup from './components/Signup';
import { AvatarGenerator } from 'random-avatar-generator';
import GIF from './static/gif.gif';
import VID from './static/gif.webm';

function App() {
	const generator = new AvatarGenerator();
	const [posts, setPosts] = useState([]);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// user is logged in...

				setUser(authUser);

				if (authUser.displayName) {
					// dont update username
				} else {
					return authUser.updateProfile({
						displayName: username,
					});
				}
			} else {
				setUser(null);
			}
		});

		return () => {
			unsubscribe();
		};
	}, [user, username]);

	const fetchPosts = async () =>
		await axios.get('/sync').then((response) => {
			setPosts(response.data);
			setLoading(false);
		});

	useEffect(() => {
		var pusher = new Pusher('483cf55d24a3edf2a308', {
			cluster: 'ap2',
		});

		var channel = pusher.subscribe('posts');
		channel.bind('inserted', (data) => {
			fetchPosts();
		});
	}, []);

	useEffect(() => {
		fetchPosts();
		console.log('posts');
	}, []);

	const handleLogin = (e) => {
		console.log('login object');
		e.preventDefault();
		auth.signInWithEmailAndPassword(email, password).catch((error) =>
			alert(error.message)
		);
	};
	const handleRegister = (e) => {
		e.preventDefault();
		auth.createUserWithEmailAndPassword(email, password).catch((error) =>
			alert(error.message)
		);
		auth.signInWithEmailAndPassword(email, password);
	};

	function Navbar({ User }) {
		return (
			<div className='app__header'>
				<h1 className='company_logo'>Trendd</h1>
				{User && User.displayName ? (
					<div className='app__headerRight'>
						<Button
							variant='contained'
							size='small'
							onClick={() => auth.signOut()}
							className='control_btn'
						>
							Logout
						</Button>
						<Avatar
							className='post__avatar'
							alt={User.displayName[0]}
							size='small'
							src={generator.generateRandomAvatar(
								User.displayName
							)}
						/>
						<Button
							variant='contained'
							color='secondary'
							className='user_chip'
							size='small'
							style={{ textTransform: 'none' }}
						>
							{User.displayName}
						</Button>
					</div>
				) : (
					<form className='app__loginHome'>
						<Link className='link_option' to='login'>
							<Button
								variant='contained'
								size='small'
								className='control_btn'
							>
								Login
							</Button>
						</Link>
						<Link className='link_option' to='register'>
							<Button
								variant='contained'
								size='small'
								className='control_btn'
							>
								Sign Up
							</Button>
						</Link>
					</form>
				)}
			</div>
		);
	}

	return (
		<div className='app'>
			<HashRouter>
				<Route exact path='/'>
					<Navbar User={user} />
					{loading ? (
						<div className='loading_Div'>
							<video autoPlay loop src={VID} alt='' />
							<h1>Loading...</h1>
						</div>
					) : (
						<div className='app__posts'>
							{user?.displayName ? (
								<div className='app__upload'>
									<ImageUpload username={user.displayName} />
								</div>
							) : (
								<div className='app__upload'>
									<div
										className='control_post_btn_div'
										style={{
											display: 'flex',
										}}
									>
										<Link
											className='link_option'
											to='login'
										>
											<Button
												variant='contained'
												size='large'
												className='control_btn'
											>
												Login to Post
											</Button>
										</Link>
									</div>
								</div>
							)}
							<div className='app__postsLeft'>
								<FlipMove>
									{posts.map((post) => (
										<Posts
											user={user}
											key={post._id}
											postId={post._id}
											username={post.user}
											caption={post.caption}
											imageUrl={post.Image}
											timestamp={post.timestamp}
											description={post.description}
										/>
									))}
								</FlipMove>
							</div>
						</div>
					)}
				</Route>

				<Route path='/post_:postId'>
					<Navbar User={user} />
					<Post User={user} posts={posts} />
				</Route>
				<Route exact path='/login'>
					<Login
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
						handleLogin={handleLogin}
						user={user}
					/>
				</Route>
				<Route exact path='/register'>
					<Signup
						username={username}
						setUsername={setUsername}
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
						handleRegister={handleRegister}
						user={user}
					/>
				</Route>
			</HashRouter>
		</div>
	);
}

export default App;
