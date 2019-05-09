const questionAnswerService = require('../../services/QuestionAnswer');
const InfoQna = require('../../model/InfoQna');

exports.getQuestionAnswer = async (req, res) => {
    try{

let path=`${InfoQna.Service}${InfoQna.KnowledgebasesMethod}${InfoQna.KnowledgeBaseId}/${InfoQna.KnowledgebasesType}/qna/`
 questionAnswerService.getQuestionAnswer(path, function (r) {
	let response= JSON.stringify(JSON.parse(r.response), null, 4)
	return res.send(response);
});

    }catch(err) {
        return res.sendStatus(401);
    }
}


exports.putQuestionAnswer = async (req,res)=>{
    try{
        let path=`${InfoQna.Service}${InfoQna.KnowledgebasesMethod}${InfoQna.KnowledgeBaseId}`
        console.log(path);
     let content =   JSON.stringify(req.body.info)
        console.log(content);
 questionAnswerService.putQuestionAnswer(path, content, function (r) {
   console.log('regresa del servicio');
   console.log(r);
	return res.sendStatus(201);
});
    }
    catch(err){     

      console.log(err);
      return res.sendStatus(401);
    }
}

exports.patchQuestionAnswer = async (req,res)=>{
  try{
      let path=`${InfoQna.Service}${InfoQna.KnowledgebasesMethod}${InfoQna.KnowledgeBaseId}`
      console.log(path);
   let content =   JSON.stringify(req.body.info)
      console.log(content);
questionAnswerService.patchQuestionAnswer(path, content, function (r) {
 let operation = JSON.parse(r);
console.log('comienza loop ', operation.operationId);
 let loop = function () {
 let pathL =`${InfoQna.Service}/operations/${operation.operationId}`;
 console.log('url',pathL);
  questionAnswerService.statusOperation(pathL, function (status) {

    console.log('body: ',JSON.parse(status.response));

    var state = (JSON.parse(status.response)).operationState;

    if (state == 'Running' || state == 'NotStarted') {
      console.log ('Waiting ' + status.wait + ' seconds...');
      setTimeout(loop, status.wait * 1000);
    }
  });
}
// Begin the loop.
loop();

return res.sendStatus(201);
});
  }
  catch(err){     

    console.log(err);
    return res.sendStatus(401);
  }
}