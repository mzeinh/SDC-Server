/* eslint-disable camelcase */
const db = require('../database');

module.exports = {
  getAll: (product_id, callback) => {
    const q = `SELECT
                question_id, question_body,
                to_timestamp(question_date/1000) as question_date,
                asker_name, question_helpfulness, "questions"."reported",
                (
                  SELECT jsonb_agg(nested_answers)
                  FROM (
                        SELECT
                        answers.answer_id,
                        answers.body,
                        to_timestamp(answers.date/1000) as date,
                        answers.answerer_name,
                        answers.helpfulness,
                        (
                      SELECT json_agg(nested_photos)
                      FROM (
                        SELECT
                        photos.id,
                        photos.url
                        FROM photos
                        where photos.answer = answers.answer_id
                      ) AS nested_photos
                    ) AS photos
                    FROM answers
                    WHERE answers.question = questions.question_id
                  ) AS nested_answers
                ) AS answers
            FROM questions
          WHERE questions.product_id = $1`;
    const values = [product_id];
    db.query(q, values, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    });
  },
};
