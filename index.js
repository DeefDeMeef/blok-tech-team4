import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = 5000;
import path from 'path';
const uri = process.env.DB_HOST;
app.use(express.static('static'));

app.set('view engine', 'ejs');

app.listen(port, () => {
	console.log(`listening at port ${port}`);
});

app.get('/', (req, res) => {
	res.send('hello');
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
