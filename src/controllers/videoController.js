import routes from '../routes';
import Video from '../models/Video';
import Comment from '../models/Comment';

export const home = async (req, res) => {
	try {
		const videos = await Video.find({}).sort({ _id: -1 });
		res.render('home', { pageTitle: 'Home', videos });
	} catch (err) {
		console.log(err);
		res.render('home', { pageTitle: 'Home', videos: [] });
	}
};

export const search = async (req, res) => {
	const {
		query: { term: searchingBy },
	} = req;
	let videos = [];
	try {
		videos = await Video.find({
			title: { $regex: searchingBy, $options: 'i' },
		});
	} catch (err) {
		console.log(err);
	}
	res.render('search', { pageTitle: 'Search', searchingBy, videos });
};

export const getUpload = (req, res) =>
	res.render('upload', { pageTitle: 'Upload' });

export const postUpload = async (req, res) => {
	const {
		body: { title, description },
		file: { location },
	} = req;
	const newVideo = await Video.create({
		fileUrl: location,
		title,
		description,
		creator: req.user.id,
	});
	req.user.videos.push(newVideo.id);
	req.user.save();
	res.redirect(routes.videoDetail(newVideo._id));
};

export const videoDetail = async (req, res) => {
	const { id } = req.params;
	try {
		const video = await Video.findById(id)
			.populate('creator')
			.populate('comments');
		res.render('videoDetail', { pageTitle: video.title, video });
	} catch (err) {
		res.redirect(routes.home);
	}
};

export const getEditVideo = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	try {
		const video = await Video.findById(id);
		if (video.creator !== req.user.id) {
			throw Error();
		} else {
			res.render('editVideo', {
				pageTitle: `Edit ${video.title}`,
				video,
			});
		}
	} catch (err) {
		console.log(err);
		res.redirect(routes.home);
	}
};
export const postEditVideo = async (req, res) => {
	const {
		body: { title, description },
		params: { id },
	} = req;
	try {
		await Video.findByIdAndUpdate({ _id: id }, { title, description });
		res.redirect(routes.videoDetail(id));
	} catch (err) {
		res.redirect(routes.home);
	}
};

export const deleteVideo = async (req, res) => {
	const { id } = req.params;
	try {
		const video = await Video.findById(id);
		if (video.creator !== req.user.id) {
			throw Error();
		} else {
			await Video.findByIdAndRemove({ _id: id });
			res.render('editVideo', {
				pageTitle: `Edit ${video.title}`,
				video,
			});
		}
	} catch (err) {
		console.log(err);
	}
	res.redirect(routes.home);
};

// Register Video Views

export const postRegisterView = async (req, res) => {
	const { id } = req.params;
	try {
		const video = await Video.findById(id);
		video.views += 1;
		video.save();
		res.status(200);
	} catch (err) {
		res.status(400);
	} finally {
		// res.end();
	}
};

export const postAddComment = async (req, res) => {
	const {
		params: { id },
		body: { comment },
		user,
	} = req;
	try {
		const video = await Video.findById(id);
		const newComment = await Comment.create({
			text: comment,
			creator: user.id,
		});
		video.comments.push(newComment.id);
		video.save();
		res.send({ id: newComment.id });
	} catch (err) {
		res.status(400);
	} finally {
		res.end();
	}
};

export const deleteComment = async (req, res) => {
	const {
		body: { commentId },
		user,
	} = req;
	const id = await Comment.findById({ _id: commentId }).populate('creator');
	if (id.creator.id === user.id) {
		try {
			await Comment.findByIdAndRemove(commentId);
			console.log('await');
		} catch (err) {
			console.log(err);
		} finally {
			res.end();
		}
	}
};
