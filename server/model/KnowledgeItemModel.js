Answer = require('./AnswerModel');
Questions = require('./QuestionModel');
const KnowledgeItem ={
    id : int,
    answer : Answer,
    newAnswer : Answer,
    source : String,
    questions : any,
    metadata : any
}
module.exports = KnowledgeItem;