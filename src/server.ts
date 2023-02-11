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
	console.log(err);
	res.status(err.status || 500);
	res.json({ message: err.message });
});

export default app;
