import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Post.css';
import { Button, Avatar } from '@material-ui/core';
import { Card } from '@material-ui/core';
import TimeAgo from 'javascript-time-ago';
import { AvatarGenerator } from 'random-avatar-generator';
import CommentIcon from '@material-ui/icons/Comment';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import GradeIcon from '@material-ui/icons/Grade';
import NewComment from './comment/NewComment';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GIF from '../static/gif.gif';
import SimpleModal from './PostModal';
import axios from '../util/axios';

function Post(props) {
	const { postId } = useParams();
	const [mainpost, setPost] = useState([]);
	const [defaultComments, setDefaultComments] = useState([]);

	const pageURL = `https://collagetrendd.netlify.app/#/post_${postId}`;

	useEffect(() => {
		props.posts.map((post) => {
			if (post._id === postId) {
				setPost(post);
			}
		});
	}, [props]);
	// console.log(`https://collagetrendd.netlify.app/post_${postId}`);

	const timeAgo = new TimeAgo('en-US');
	const generator = new AvatarGenerator();
	const [Like, setLike] = useState(false);
	const [comments, setComments] = useState(defaultComments);
	const [isNewComment, setNewComment] = useState(false);

	const handleLike = () => {
		setLike(false);
		axios
			.post('/increaseLike', {
				id: postId,
			})
			.then((response) => console.log(response));
	};

	return (
		<>
			{mainpost._id ? (
				<>
					<Card className='Card'>
						<div className='post_div'>
							<div className='post__images'>
								{mainpost.Image !== 'none' ? (
									<img src={mainpost.Image} alt='post' />
								) : (
									''
								)}
							</div>

							<div className='post_details'>
								<span>
									<h2 className='post__head'>
										{mainpost.caption}
									</h2>

									<h3 className='post_dspt'>
										{mainpost.description}
									</h3>
								</span>
								<span className='post__headername'>
									<Avatar
										className='post__avatar'
										alt={mainpost.user}
										src={generator.generateRandomAvatar(
											mainpost.user
										)}
									/>
									<h4>{mainpost.user}</h4>
								</span>
							</div>
						</div>
						<div className='post__header'>
							<div className='react_icons_div'>
								{Like ? (
									<GradeIcon
										className='react_icons'
										onClick={() => setLike(false)}
									/>
								) : (
									<GradeOutlinedIcon
										className='react_icons'
										onClick={handleLike}
									/>
								)}
								<div className='react_number'>{`109`}</div>

								<CommentIcon
									className='react_icons'
									onClick={() => setNewComment(true)}
								/>
								<div className='react_number'>
									{`${comments.length} Comments`}
								</div>

								<SimpleModal pageURL={pageURL} />
							</div>
							<h4 className='post_description'>
								{timeAgo.format(Number(mainpost.timestamp))}
							</h4>
						</div>
					</Card>
					<Card className='Card'>
						{props.User?.displayName ? (
							<section className='comment-details'>
								{isNewComment ? (
									<NewComment
										onCancel={() => setNewComment(false)}
										isNewComment={true}
									></NewComment>
								) : (
									<Button
										variant='contained'
										size='small'
										className='control_btn'
										onClick={() => setNewComment(true)}
									>
										Add a comment{' '}
										<AddCircleIcon className='addCircleIcon' />
									</Button>
								)}
							</section>
						) : (
							<h1 style={{ textAlign: 'center' }}>
								Please Login to see the Comments
							</h1>
						)}
					</Card>
				</>
			) : (
				<div className='loading_Div'>
					<img src={GIF} alt='' />
					<h1>Loading...</h1>
				</div>
			)}
		</>
	);
}

export default Post;
