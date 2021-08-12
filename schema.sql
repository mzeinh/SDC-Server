CREATE TABLE Questions (
  question_id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date BIGINT NOT NULL,
  asker_name VARCHAR(50) NOT NULL,
  asker_email VARCHAR(250) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  question_helpfulness INT NOT NULL DEFAULT 0
);

CREATE TABLE Answers (
  answer_id SERIAL PRIMARY KEY,
  question INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date BIGINT NOT NULL,
  answerer_name VARCHAR(50) NOT NULL,
  answerer_email VARCHAR(250) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  helpfulness INT NOT NULL DEFAULT 0
);

CREATE TABLE Photos (
  id SERIAL PRIMARY KEY,
  url VARCHAR(300) NOT NULL,
  answer INT NOT NULL
);


ALTER TABLE Answers ADD FOREIGN KEY (question) REFERENCES Questions (question_id);
ALTER TABLE Photos ADD FOREIGN KEY (answer) REFERENCES Answers (answer_id);
