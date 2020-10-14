import routes from '../routes';
import Video from '../models/Video';

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
		file: { path },
	} = req;
	const newVideo = await Video.create({
		fileUrl: path,
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
		const video = await Video.findById(id).populate('creator');
		res.render('videoDetail', { pageTitle: video.title, video });
	} catch (err) {
		res.redirect(routes.home);
	}
};

export const getEditVideo = async (req, res) => {
	const { id } = req.params;
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
