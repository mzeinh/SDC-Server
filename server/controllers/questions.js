/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const models = require('../models');

module.exports = {
  getAllQuestions(request, response) {
    const { product_id } = request.query;
    const requestPage = request.query.page || 0;
    const requestCount = request.query.count || 5;

    const queryParams = {
      product_id,
      requestPage,
      requestCount,
    };

    const productObj = {
      product_id,
      results: [],
    };

    if (product_id) {
      models.questions.getAllQuestions(queryParams, (err, result) => {
        if (err) {
          response.status(500).send();
        } else {
          productObj.results = result.rows;
          response.status(200).send(productObj);
        }
      });
    } else {
      response.status(422).send();
    }
  },

  postQuestion(request, response) {
    const {
      body,
      name,
      email,
      product_id,
    } = request.body;

    if (body && name && email && product_id) {
      models.questions.createQuestion(request.body, (err, result) => {
        if (err) {
          response.status(500).send();
        } else {
          response.status(201).send();
        }
      });
    } else {
      response.status(422).send();
    }
  },

  markQuestionAsHelpful(request, response) {
    const { question_id } = request.params;

    if (question_id) {
      models.questions.updateQuestionHelpfulness(question_id, (err, result) => {
        if (err) {
          response.status(500).send();
        } else {
          response.status(204).send();
        }
      });
    } else {
      response.status(422).send();
    }
  },

  markQuestionsAsReported(request, response) {
    const { question_id } = request.params;

    if (question_id) {
      models.questions.updateQuestionAsReported(question_id, (err, result) => {
        if (err) {
          response.status(500).send();
        } else {
          response.status(204).send();
        }
      });
    } else {
      response.status(422).send();
    }
  },
};
