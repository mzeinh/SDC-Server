/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const db = require('../database');

module.exports = {
  getAllQuestions: ({ product_id, requestPage, requestCount }, callback) => {
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
                      SELECT CASE COUNT(nested_photos)
                        WHEN 0 THEN '[]'
                        ELSE json_agg(nested_photos)
                        END
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
          WHERE questions.product_id = $1 AND questions.reported = false
          OFFSET $2
          LIMIT $3`;
    const values = [product_id, requestPage, requestCount];

    db.query(q, values, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  createQuestion: ({
    name,
    body,
    email,
    product_id,
  }, callback) => {
    const q = `INSERT INTO questions
                (
                  product_id,
                  question_body,
                  question_date,
                  asker_name,
                  asker_email
                )
                VALUES
                (
                  $1, $2, (select extract(epoch from now()) * 1000), $3, $4
                )`;
    const values = [
      product_id,
      body,
      name,
      email,
    ];

    db.query(q, values, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  updateQuestionHelpfulness: (question_id, callback) => {
    const q = `UPDATE questions
                SET question_helpfulness = question_helpfulness + 1
                WHERE question_id = $1`;

    const values = [question_id];

    db.query(q, values, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  updateQuestionAsReported: (question_id, callback) => {
    const q = `UPDATE questions
    SET reported = true
    WHERE question_id = $1`;

    const values = [question_id];

    db.query(q, values, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
};
