import React from 'react';
import './Comment.css';
import { AvatarGenerator } from 'random-avatar-generator';
import Avatar from '@material-ui/core/Avatar';
import TimeAgo from 'javascript-time-ago';

const generator = new AvatarGenerator();

function ReplyComment({ nestedComment }) {
	const timeAgo = new TimeAgo('en-US');
	return (
		<li className='comment-item nested'>
			<article className=''>
				<header>
					<Avatar
						className='post_avatar'
						alt={nestedComment.userName}
						src={generator.generateRandomAvatar(
							nestedComment.userName
						)}
					/>
					<span className='user-name'>{nestedComment.userName}</span>
				</header>
				<div className='comment'>
					<h5>{nestedComment.comment}</h5>
				</div>

				<footer>
					<h6 className='log-time'>
						{timeAgo.format(Number(nestedComment.time))}
					</h6>
				</footer>
			</article>
		</li>
	);
}

export default ReplyComment;
