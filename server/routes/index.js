const express = require('express');
const QuestionWeb = require('./QuestionAnswer/QuestionAnswer-web');
const router = express.Router();

module.exports = (app) => {

    router.route('/QuestionAnswer')
          .get(QuestionWeb.getQuestionAnswer)
          .put(QuestionWeb.putQuestionAnswer)
          .patch(QuestionWeb.patchQuestionAnswer)
    app.use('/api', router);
}