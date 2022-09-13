import mongoose from 'mongoose';

const instance = mongoose.Schema({
	timestamp: String,
	comment: String,
	user: String,
	reply: Array,
});

export default mongoose.model('comments', instance);
