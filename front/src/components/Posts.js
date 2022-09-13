import React, { forwardRef, useState } from 'react';
import './Posts.css';
import Avatar from '@material-ui/core/Avatar';
import { Card } from '@material-ui/core';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { Link } from 'react-router-dom';
import { AvatarGenerator } from 'random-avatar-generator';
import CommentIcon from '@material-ui/icons/Comment';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import GradeIcon from '@material-ui/icons/Grade';
import mainLogo from '../static/icon.png';

TimeAgo.addDefaultLocale(en);

const Posts = forwardRef(
	(
		{ user, username, postId, imageUrl, caption, timestamp, description },
		ref
	) => {
		const timeAgo = new TimeAgo('en-US');
		const generator = new AvatarGenerator();
		const [Like, setLike] = useState(false);

		return (
			<Card className='Card' ref={ref}>
				<div className='post'>
					<div className='post__image'>
						{imageUrl !== 'none' ? (
							<img
								src={imageUrl}
								alt='post'
								width='512'
								height='512'
							/>
						) : (
							<img
								src={mainLogo}
								width='512'
								height='512'
								alt='post'
							/>
						)}
					</div>

					<div className='post__text'>
						<span className='post__headername'>
							<Avatar
								className='post__avatar'
								alt={username}
								src={generator.generateRandomAvatar(username)}
							/>
							<h4>{username}</h4>
						</span>
						<Link
							className='link_div'
							to={user ? `post_${postId}` : `login`}
						>
							<h2 className='post__heading'>{caption}</h2>
						</Link>
						<h3 className='post_description'>{description}</h3>
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
								onClick={() => setLike(true)}
							/>
						)}
						<div className='react_number'>109</div>
						<Link className='link_div' to={`post/${postId}`}>
							<CommentIcon className='react_icons' />
							<div className='react_number'>42</div>
						</Link>
						<ShareOutlinedIcon className='react_icons' />
					</div>
					<h4 className='post_description'>
						{timeAgo.format(Number(timestamp))}
					</h4>
				</div>
			</Card>
		);
	}
);

export default Posts;
