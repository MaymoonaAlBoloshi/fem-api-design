import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createUser, loginUser } from './handlers/user';

const app = express();

// Middlewares

// logger
app.use(morgan('dev'));
// json parser
app.use(express.json());
// urlencoded parser
app.use(express.urlencoded({ extended: false }));
// cors
app.use(cors());

app.get('/', (req, res) => {
	res.status(200);
	res.json({ message: 'Hello World!' });
});

app.use('/api', protect, router);
app.post('/user', createUser);
app.post('/login', loginUser);

app.use((err, req, res, next) => {
	if (err.name === 'auth') {
		res.status(401).json({ message: 'Unauthorized' });
	}
	if (err.name === 'input') {
		res.status(400).json({ message: 'Bad request' });
	} else {
		res.status(500).json({ message: 'Internal server error' });
	}
});

export default app;
