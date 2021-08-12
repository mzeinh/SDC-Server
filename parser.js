const parse = require('csv-parse');
const fs = require('fs');

const db = require('./server/database');

// questions

db.db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('connected successfuly');
  }
});

fs.createReadStream('./CSV/questions.csv')
  .pipe(parse({ columns: true }))
  .on('data', (data) => {
    // questionsOutput.push(data)
    if (data.id > 3518864) {
      const {
        product_id,
        body,
        date_written,
        asker_name,
        asker_email,
        reported,
        helpful,
      } = data;

      const q = 'Insert into questions (product_id, question_body, question_date, asker_name, asker_email, question_helpfulness, reported) VALUES ($1, $2, to_timestamp($3), $4, $5, $6, $7)';
      const values = [
        product_id,
        body,
        date_written/1000,
        asker_name,
        asker_email,
        helpful,
        reported,
      ];
      db.query(q, values, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          // console.log(res.row[0]);
        }
      });
    }
  })
  .on('end', () => {
    console.log('questionsOutput done');
  });

// answers

fs.createReadStream('./CSV/answers.csv')
  .pipe(parse({ columns: true }))
  .on('data', (data) => {
    // id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful
    if (data.id > 4572147) {
      const {
        question_id,
        body,
        date_written,
        answerer_name,
        answerer_email,
        reported,
        helpful,
      } = data;

      const q = 'Insert into answers (question, body, date, answerer_name, answerer_email, helpfulness, reported) VALUES ($1, $2, to_timestamp($3), $4, $5, $6, $7)';
      const values = [
        question_id,
        body,
        date_written/1000,
        answerer_name,
        answerer_email,
        helpful,
        reported,
      ];
      db.query(q, values, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          // console.log(res.row[0]);
        }
      });
    }
  })
  .on('end', () => {
    console.log('answersOutput done');
  });

//answers_photos

fs.createReadStream('./CSV/answers_photos.csv')
  .pipe(parse({ columns: true }))
  .on('data', (data) => {
    const {
      url,
      answer_id,
    } = data;

    const q = 'Insert into photos (url, answer) VALUES ($1, $2)';
    const values = [url, answer_id];
    db.query(q, values, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        // console.log(res.row[0]);
      }
    });
  })
  .on('end', () => {
    console.log('answers_photosOutput done');
  });

// node --max-old-space-size=8192 ./parser.js