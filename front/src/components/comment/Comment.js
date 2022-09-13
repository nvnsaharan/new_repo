import React, { useState } from 'react';
import NewComment from './NewComment';
import ReplyComment from './ReplyComment';
import './Comment.css';
import { AvatarGenerator } from 'random-avatar-generator';
import Avatar from '@material-ui/core/Avatar';
import TimeAgo from 'javascript-time-ago';

const generator = new AvatarGenerator();

/* Renders the threaded comments and new comments */
const Comment = ({ commentInfo, isRootComment }) => {
	const timeAgo = new TimeAgo('en-US');
	const [showReply, setReply] = useState(false);

	return (
		<li className={isRootComment ? 'comment-item' : 'comment-item nested'}>
			<article className={commentInfo.children ? 'has-child' : ''}>
				<header>
					<Avatar
						className='post_avatar'
						alt={commentInfo.userName}
						src={generator.generateRandomAvatar(
							commentInfo.userName
						)}
					/>
					<span className='user-name'>{commentInfo.userName}</span>
				</header>
				<div className='comment'>
					<h5>{commentInfo.comment}</h5>
				</div>

				<footer>
					<h5 className='reply' onClick={() => setReply(true)}>
						Reply
					</h5>
					<span>|</span>
					<h6 className='log-time'>
						{timeAgo.format(Number(commentInfo.time))}
					</h6>
				</footer>
				{showReply && (
					<NewComment
						onCancel={() => setReply(false)}
						parentId={commentInfo.id}
					></NewComment>
				)}
			</article>
			{commentInfo.children &&
				commentInfo.children.map((comment, index) => (
					<ReplyComment key={index} nestedComment={comment} />
				))}
		</li>
	);
};

export default Comment;
