

let https = require ('https');
const InfoQna = require('../model/InfoQna');


response_handler = (callback, response) => {
    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
		callback ({ status : response.statusCode, headers : response.headers, body : body });
    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};

get_response_handler = (callback) => {
        return (response) => response_handler (callback, response);            
    }

get =  (path, callback)=> {
	let request_params = {
		method : 'GET',
		hostname : InfoQna.Host,
		path : path,
		headers : {
			'Ocp-Apim-Subscription-Key' : InfoQna.SubscriptionKey,
		}
	};
	let req = https.request (request_params, get_response_handler (callback));
	req.end ();
}

update=(method , path, content, callback)=> {
	let request_params = {
		method : method,
		hostname : InfoQna.Host,
		path : path,
		headers : {
			'Content-Type' : 'application/json',
			'Content-Length' : Buffer.byteLength(content),
			'Ocp-Apim-Subscription-Key' : InfoQna.SubscriptionKey,
		}
	};
	let req = https.request (request_params, get_response_handler (callback));
	req.write (content);
	req.end ();
}

exports.getQuestionAnswer = function (path, callback) {
	console.log ('Calling ' + path + '.');
	get (path, function (response) {
		callback ({ operation : response.headers.location, response : response.body });
	});
}

exports.putQuestionAnswer = function (path, req, callback)
{
	console.log ('Calling ' + path + '.');
	update('PUT',path, req, function (response) {
	response.status == '204'?callback ({'result':'Success'}):callback (response.body);				
			});
}

exports.patchQuestionAnswer = function (path, req, callback)
{
	console.log ('Calling ' + path + '.');
	update('PATCH',path, req, function (response) {
	response.status == '204'?callback ({'result':'Success'}):callback (response.body);				
			});
}

exports.statusOperation = function (path, callback)
 {
	get(path, function (response) {
		callback ({ wait : response.headers['retry-after'], response : response.body});
	});
}

