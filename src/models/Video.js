import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
	fileUrl: {
		type: String,
		required: 'file url is required',
	},
	title: {
		type: String,
		required: 'title is required',
	},
	description: String,
	views: {
		type: Number,
		default: 0,
	},
	createAt: {
		type: Number,
		default: Date.now(),
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
		},
	],
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Model = mongoose.model('Video', VideoSchema);

export default Model;
