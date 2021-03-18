import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
const app = express();
const port = 5000;
const uri = process.env.DB_HOST;

dotenv.config();
app.use(express.static('static'));

app.set('view engine', 'ejs');

app.listen(port, () => {
	console.log(`listening at port ${port}`);
});

app.get('/', (req, res) => {
	res.send('hello');
	logUser();
});

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('connected to mongo');
	})
	.catch((err) => {
		console.log(err);
	});
