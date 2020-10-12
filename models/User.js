import mongoose from 'mongoose';
import passportLocal from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	avatarUrl: String,
	facebookId: Number,
	githubId: Number,
});

UserSchema.plugin(passportLocal, { usernameField: 'email' });

const Model = mongoose.model('User', UserSchema);

export default Model;
