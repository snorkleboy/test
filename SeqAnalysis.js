const SeqArray = require('./SeqArray.js')
const SeqAnalysis = function(k,priceArray){
    const seqArray = new SeqArray(k).build(priceArray);
    console.log(seqArray.seqs);
}

module.exports = SeqAnalysis