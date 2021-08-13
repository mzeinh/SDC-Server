const router = require('express').Router();
const { questions, answers } = require('./controllers/index');

const {
  getAllQuestions,
  postQuestion,
  markQuestionAsHelpful,
  markQuestionsAsReported,
} = questions;

const {
  getAllAnswers,
  postAnswer,
} = answers;

// questions

router.get('/qa/questions', getAllQuestions);

router.post('/qa/questions', postQuestion);

router.put('/qa/questions/:question_id/helpful', markQuestionAsHelpful);

router.put('/qa/questions/:question_id/report', markQuestionsAsReported);

// answers

router.get('/qa/questions/:question_id/answers', getAllAnswers);

module.exports = router;
