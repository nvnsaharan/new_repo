import mongoose from 'mongoose';

const instance = mongoose.Schema({
	timestamp: String,
	caption: String,
	user: String,
	Image: String,
	comments: Number,
	Likes: Number,
	description: String,
});

export default mongoose.model('posts', instance);
