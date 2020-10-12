import app from './app';
import dotenv from 'dotenv';
dotenv.config();

import './db';
import './models/Video';
import './models/Comment';
import './models/User';

const PORT = process.env.PORT || 4000;

const handleListening = () => {
	console.log(`server running on port ${PORT}`);
};

app.listen(PORT, handleListening);
