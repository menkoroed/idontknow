const { Router } = require('express');
const Question = require('./model.js');
const easy = Router();

easy.post('/easy', async (req, res) => {
	try {
		const question = new Question({
			text: req.body.text,
			answers: req.body.answers
		})

		await Question.create(question);
	} catch (err) {
		console.error(err)
	}
})

easy.get('/easy', (req, res) => {
	Question.find({}, (err, result) => {
		if (err) {
			console.error(err);
		} else {
			res.json(result);
		}
	})
})
 
module.exports = easy;
