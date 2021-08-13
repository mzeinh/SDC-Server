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
        console.log(err);
      } else {
        resultObj.results = queryResult.rows;
        response.send(resultObj);
      }
    });
  },
  postAnswer(req, res) {
  },
};
