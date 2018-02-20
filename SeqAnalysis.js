const SeqArray = require('./SeqArray.js')
// first a SeqArray is built
// a SeqArray keeps track of sequences, thier length and type(1,0,-1).
// once the seqArray is build, the SeqTotal for the first window is
// `for seq in seqArray sum += ((seq.length^2 - seq.length)/2) * seq.type`

// then iterate through the remaining prices, decrement/remove the seqArray.first
// and increment/add to seqArray.last depending on whether the new element is
// a continuation of a previous contiguous subsequence or the start of a new one.
const SeqAnalysis = function(k,priceArray){
    // seqArray.build uses k elements out of priceArray to build itself. 
    // once built we can get the first window SeqTotal
    result = [];
    const seqArray = new SeqArray(k).build(priceArray);
    result.push(seqArray.seqTotal);
    
    // iterate through remaining members of priceArray and add each to SeqArray.
    // each new element after seqArray has been built is a new window.
    for(let i = k; i < priceArray.length; i++){
        seqArray.add(priceArray[i]);
        
        result.push(seqArray.seqTotal);
    }
    console.log(result.join('\n'));
}

module.exports = SeqAnalysis