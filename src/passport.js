import passport from 'passport';
import User from './models/User';
import dotenv from 'dotenv';
import GithubStrategy from 'passport-github2';
import FacebookStrategy from 'passport-facebook';
import {
	facebookLoginCallback,
	githubLoginCallback,
} from './controllers/userController';
import routes from './routes';

dotenv.config();

passport.use(User.createStrategy());

passport.use(
	new GithubStrategy(
		{
			clientID: process.env.GH_ID,
			clientSecret: process.env.GH_SECRET,
			callbackURL: process.env.PRODUCTION
				? `https://mysterious-garden-46203.herokuapp.com${routes.githubCallback}`
				: `http://localhost:4000${routes.githubCallback}`,
			scope: 'user:email',
		},
		githubLoginCallback
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FB_ID,
			clientSecret: process.env.FB_SECRET,
			callbackURL: `https://mysterious-garden-46203.herokuapp.com${routes.facebookCallback}`,
			profileFields: ['id', 'displayName', 'photos', 'email'],
			scope: ['public_profile', 'email'],
		},
		facebookLoginCallback
	)
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
