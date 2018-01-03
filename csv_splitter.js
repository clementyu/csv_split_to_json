#!/usr/bin/env node

// --i input file 
// --s batch size / how many lines for each batch 

const argv = require('yargs').argv;
const csvSplitStream = require('csv-split-stream');
const fs = require('fs');

console.log('input file: ' + argv.i);
console.log('batch size: ' + argv.s);

var strOutputFilename = path.basename(argv.i);
strOutputFilename = strOutputFilename.substring(0, strOutputFilename.indexOf('.'));

return csvSplitStream.split(
  fs.createReadStream(argv.i),
  {
    lineLimit: argv.s
  },
  (index) => fs.createWriteStream(strOutputFilename + `_${index}.csv`)
)
.then(csvSplitResponse => {
  console.log('csvSplitStream succeeded.', csvSplitResponse);
  // outputs: {
  //  "totalChunks": 350,
  //  "options": {
  //    "delimiter": "\n",
  //    "lineLimit": "10000"
  //  }
  // }
}).catch(csvSplitError => {
  console.log('csvSplitStream failed!', csvSplitError);
});
