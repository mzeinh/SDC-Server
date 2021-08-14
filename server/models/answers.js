/* eslint-disable no-unused-vars */
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
                WHERE question = $1 AND reported = false
                OFFSET $2
                LIMIT $3`;

    const values = [question_id, requestPage, requestCount];

    db.query(q, values, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  postAnswer: ({
    question_id,
    body,
    name,
    email,
    photos,
  }, callback) => {
    const answersQ = `INSERT INTO answers
                (
                  question,
                  body,
                  date,
                  answerer_name,
                  answerer_email
                )
                VALUES
                (
                  $1, $2, (select extract(epoch from now()) * 1000), $3, $4
                ) RETURNING answer_id`;

    const answersQvalues = [question_id, body, name, email];

    db.query(answersQ, answersQvalues, (answerErr, answerResults) => {
      if (answerErr) {
        callback(answerErr, null);
      } else {
        const { answer_id } = answerResults.rows[0];

        const valuesGenerator = photos.map((url, index) => (`(${answer_id}, $${index + 1})`));
        const valuesString = valuesGenerator.join(', ');

        const photosQ = `INSERT INTO photos
                          (
                            answer,
                            url
                          )
                          VALUES ${valuesString}`;

        const photosValues = photos;

        db.query(photosQ, photosValues, (photosErr, photosResults) => {
          if (photosErr) {
            callback(photosErr, null);
          } else {
            callback(null, photosResults);
          }
        });
      }
    });
  },

  markAnswerAsHelpful: (answer_id, callback) => {
    const q = `UPDATE answers
                SET helpfulness = helpfulness + 1
                WHERE answer_id = $1`;

    const values = [answer_id];

    db.query(q, values, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, err);
      }
    });
  },

  markAnswerAsReported: (answer_id, callback) => {
    const q = `UPDATE answers
                SET reported = true
                WHERE answer_id = $1`;

    const values = [answer_id];

    db.query(q, values, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
};
