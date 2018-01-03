// --i input file 
// --u JSON upload URL. 

const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const validUrl = require('valid-url');
var request = require('request');


if ((argv.u) && (validUrl.isUri(argv.u))) {
	console.log('Looks like an URI');
} else {
	console.log('Not a valid URI');
	return;
}

var strOutputFilename = path.basename(argv.i);
strOutputFilename = strOutputFilename.substring(0, strOutputFilename.indexOf('.'));

var csvReadStream = fs.createReadStream(argv.i);
var options = { encoding: 'utf-8' };
var wstream = fs.createWriteStream(strOutputFilename + '.json' , options);

var index = 0;

csv({
	delimiter:"\t"
})
.fromStream(csvReadStream)
.on('csv',(csvRow)=>{
	// csvRow is an array
	//console.log('csv row: ' + csvRow);
})
.on('json',(jsonObj)=>{

	wstream.write(JSON.stringify(jsonObj, null, 2), 'utf-8' );	
	console.log('json obj is : ' + JSON.stringify(jsonObj, null, 2));

	request({
            url: argv.u + index,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: jsonObj
        }, function(error, response, body) {
            console.log('request response: ' + JSON.stringify(response, null, 2));
        });

	index ++;

})
.on('done',()=>{
	wstream.end();
	console.log('File ' + strOutputFilename + '.json saved' );
})
.on('error',(err)=>{
	wstream.end();
    console.log(err);
})