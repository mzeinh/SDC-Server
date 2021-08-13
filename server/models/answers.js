/* eslint-disable camelcase */
const db = require('../database');

module.exports = {
  getAll: ({ question_id, requestPage, requestCount }, callback) => {
    const q = `SELECT
                answer_id, body,
                to_timestamp(date/1000) as date,
                answerer_name, helpfulness,
                (
                  SELECT CASE COUNT(p) WHEN 0 THEN '[]' ELSE json_agg(p) END
                  FROM
                  (
                    SELECT
                      id, url
                    FROM photos
                    WHERE photos.answer = answers.answer_id
                  ) as p
                ) as photos
                FROM ANSWERS
                WHERE question = $1
                LIMIT $2`;

    const values = [question_id, requestCount];

    db.query(q, values, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

};
