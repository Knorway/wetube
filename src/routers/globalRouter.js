import express from 'express';
import passport from 'passport';
import {
	getJoin,
	postJoin,
	logout,
	getLogin,
	postLogin,
	githubLogin,
	postGithubLogin,
	facebookLogin,
	postFacebookLogin,
	userDetail,
} from '../controllers/userController';
import { home, search } from '../controllers/videoController';
import { onlyPrivate, onlyPublic } from '../middlewares';
import routes from '../routes';

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
	routes.githubCallback,
	passport.authenticate('github', { failureRedirect: '/login' }),
	postGithubLogin
);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
	routes.facebookCallback,
	passport.authenticate('facebook', { failureRedirect: '/login' }),
	postFacebookLogin
);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.userDetail, userDetail);

globalRouter.get('/admin', (req, res) => {
	res.render('layouts/admin');
});

export default globalRouter;
