/* eslint-disable camelcase */
const models = require('../models');

module.exports = {
  getAllQuestions(req, response) {
    const { product_id } = req.query;
    const productObj = { product_id, results: [] };
    if (product_id) {
      models.questions.getAll(product_id, (err, result) => {
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
    // check if product_id params exists
      // if it does, go through the logic of getting all the questions for the product
    // if it doesn't, return a 404 error
  },
  postQuestion(req, res) {
  },
};
