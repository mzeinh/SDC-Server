/* eslint-disable camelcase */
const models = require('../models');

module.exports = {
  getAllQuestions(req, response) {
    const { product_id } = req.query;
    const requestPage = req.query.page || 0;
    const requestCount = req.query.count || 5;

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
      models.questions.getAll(queryParams, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          productObj.results = result.rows;
          response.send(productObj);
        }
      });
    } else {
      response.status(404).send('product_id is not valid');
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
      models.questions.createRecord(request.body, (err, result) => {
        if (err) {
          console.log(err);
          response.status(500).send();
        } else {
          response.status(201).send();
        }
      });
    };
  },
};
