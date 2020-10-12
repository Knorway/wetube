import express from 'express';
import {
	deleteVideo,
	getEditVideo,
	getUpload,
	postEditVideo,
	postUpload,
	videoDetail,
} from '../controllers/videoController';
import { onlyPrivate, uploadVideo } from '../middlewares';
import routes from '../routes';

const videoRouter = express.Router();

// Uplaod
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit & Delete
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
