const fs = require('fs');
const path = require('path');
const SeqAnalysis = require('./SeqAnalysis.js');
filePath = path.resolve(process.cwd(), process.argv[2]);


fs.readFile(filePath, 'utf8', function (err, contents) {
    if (err){
        console.log(`error opening file: ${filePath}`,err);
    }else{
        const data = contents.split(/[\n]/);
        nk = data[0].split(' ');
        priceArray = data[1].split(' ');
        SeqAnalysis(nk[1],priceArray);
    }
    
});