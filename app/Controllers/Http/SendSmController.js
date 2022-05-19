'use strict'

var exec = require('child_process').exec;

class SendSmController {
    async info({request,response,params}) {

        var cmd = 'gammu networkinfo';
        console.log('Requesting Network Information...');
      
        exec(cmd, function(error, stdout, stderr) {
          console.log('Requesting Network Information: Done');
//          response.header('Content-type', 'application/json')
		console.log(response.json({ result: stdout, errormsg: stderr, errorout: error}))

	//console.log(result)
        });

//return response.json({ result: stdout, errormsg: stderr, errorout: error});


    }


    async send({request,response,params}) {

        const data = request.all()
        const numero = data['number']
        const mensaje = data['message']


  if(!numero) {
    response.status(500).send({ error: 'Number is not defined' });
    console.log('ERROR: Request to Send SMS received: Number is not defined. Exit.');
    return;
  }

 if(!mensaje) {
    response.status(500).send({ error: 'Message is not defined' });
    console.log('ERROR: Request to Send SMS received: Message is not defined. Exit.');
    return;
  }

	console.log('Enviando SMS, espere por favor...');

	var cmd = 'gammu sendsms TEXT ' + numero + ' -text \"' + mensaje + '\"';
  	console.log('Request to Send SMS: Call command:  \"' + cmd + ' \"');

	//envia el sms
	exec(cmd, function(error, stdout, stderr) {
    console.log('Request to Send SMS: Result: ' + stdout);
    //res.setHeader('Content-Type', 'application/json');
    if(stdout.indexOf('OK') > -1) {
      response.status(200);
      console.log('Request to Send SMS: Done');
    }
    else {
      response.status(500);
      console.log('Request to Send SMS: FAILED');
    }

     response.json({ result: stdout, errormsg: stderr, errorout: error});
  });

        return numero + ' - ' + mensaje

    }

}

module.exports = SendSmController
