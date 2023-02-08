import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';

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

// custom middleware
app.use((req, res, next) => {
	req.abc = 'abc';
	next();
});

app.get('/', (req, res) => {
	res.status(200);
	res.json({ message: 'Hello World!' });
});

app.use('/api', router);

export default app;
