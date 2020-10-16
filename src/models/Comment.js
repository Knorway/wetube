import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: 'text is required',
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	video: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Video',
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Model = mongoose.model('Comment', CommentSchema);

export default Model;
