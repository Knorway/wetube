import routes from '../routes';
import User from '../models/User';
import passport from 'passport';

export const getJoin = (req, res) => {
	res.render('join', { pageTitle: 'Join' });
};

export const postJoin = async (req, res, next) => {
	const { name, email, password, password2 } = req.body;
	if (password !== password2) {
		res.status(400);
		res.render('join', { pageTitle: 'Join' });
	} else {
		try {
			const user = await User({
				name,
				email,
			});
			await User.register(user, password);
			next();
		} catch (err) {
			console.log(err);
			res.redirect(routes.home);
		}
	}
};

export const getLogin = (req, res) => {
	res.render('login', { pageTitle: 'Log In' });
};
export const postLogin = passport.authenticate('local', {
	failureRedirect: routes.login,
	successRedirect: routes.home,
});

export const githubLogin = passport.authenticate('github');

export const postGithubLogin = (req, res) => {
	res.redirect(routes.home);
};

export const githubLoginCallback = async (_, __, profile, callback) => {
	const {
		username,
		_json: { id, avatar_url },
	} = profile;
	const email = profile.emails[0]['value'];
	console.log(profile);
	// const { value: email } = profile.emails.filter((item) => item.primary)[0];
	try {
		const user = await User.findOne({ email });
		if (user) {
			console.log(user, 'user');
			user.githubId = id;
			user.save();
			return callback(null, user);
		}
		const newUser = await User.create({
			email,
			name: username,
			githubId: id,
			avatarUrl: avatar_url,
		});
		console.log(newUser, 'newUser');
		return callback(null, newUser);
	} catch (err) {
		callback(err);
	}
};

export const facebookLogin = passport.authenticate('facebook');

export const facebookLoginCallback = async (_, __, profile, callback) => {
	const { id, name, email } = profile._json;
	try {
		const user = await User.findOne({ email });
		if (user) {
			user.facebookId = id;
			user.save();
			return callback(null, user);
		}
		const newUser = await User.create({
			email: email || 'not found from provider: facebook',
			name,
			facebookId: id,
			avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
		});
		console.log(newUser, 'newUser');
		return callback(null, newUser);
	} catch (err) {
		callback(err);
	}
};

export const postFacebookLogin = (req, res) => {
	res.redirect(routes.home);
};

export const logout = (req, res) => {
	req.logout();
	res.redirect(routes.home);
};

export const me = (req, res) => {
	res.render('userDetail', { pageTitle: 'User Detail', user: req.user });
};

export const userDetail = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById({ id });
		res.render('userDetail', { pageTitle: 'User Detail', user });
	} catch (err) {
		res.redirect(routes.home);
	}
};
export const getEditProfile = (req, res) =>
	res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) =>
	res.render('changePassword', { pageTitle: 'Change Password' });
