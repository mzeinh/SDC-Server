const router = require('express').Router();
const { questions, answers } = require('./controllers/index');

const { getAllQuestions, postQuestion } = questions;
const { getAllAnswers, postAnswer } = answers;

router.get('/qa/questions', getAllQuestions);

router.get('/qa/questions/:question_id/answers', getAllAnswers);

router.post('/qa/questions', postQuestion);

module.exports = router;
