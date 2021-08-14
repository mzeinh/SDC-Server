/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const models = require('../models');

module.exports = {
  getAllAnswers(req, response) {
    const { question_id } = req.params;
    const requestPage = req.query.page || 0;
    const requestCount = req.query.count || 5;

    const queryParams = {
      question_id,
      requestPage,
      requestCount,
    };

    const resultObj = {
      question: question_id,
      page: requestPage,
      count: requestCount,
      results: [],
    };

    models.answers.getAll(queryParams, (err, queryResult) => {
      if (err) {
        response.send(500).send();
      } else {
        resultObj.results = queryResult.rows;
        response.send(resultObj);
      }
    });
  },
  postAnswer(request, response) {
    const { question_id } = request.params;
    const {
      body,
      name,
      email,
    } = request.body;

    const queryParams = {
      ...request.body,
      question_id,
    };

    if (body && name && email) {
      models.answers.postAnswer(queryParams, (err, queryResult) => {
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

  markAnswerAsHelpful(request, response) {
    const { answer_id } = request.params;

    models.answers.markAnswerAsHelpful(answer_id, (err, result) => {
      if (err) {
        response.status(500).send();
      } else {
        response.status(204).send();
      }
    });
  },

  markAnswerAsReported(request, response) {
    const { answer_id } = request.params;

    models.answers.markAnswerAsReported(answer_id, (err, result) => {
      if (err) {
        response.status(500).send();
      } else {
        response.status(204).send();
      }
    });
  },
};
