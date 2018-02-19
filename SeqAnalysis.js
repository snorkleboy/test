const SeqArray = require('./SeqArray.js')
// first a SeqArray is build
// a SeqArray keeps track of sequences, thier length, start index(relative
// to window size), and type.
// once the seqArray is build, the SeqTotal for the first window is
// `for seq in seqArray sum+= ((seq.length^2 - seq.length)/2) * seq.type`
// then iterate through the remaining prices, decrement/remove the seqArray.first seq 
// and incriment/add to seqArray.last depending on whether the new element is
// a continuation of a previous contiguous subsequence or the start of a new one.
const SeqAnalysis = function(k,priceArray){
    // seqArray.build takes k elements out of priceArray to build itself. 
    // once built we can get the first window SeqTotal
    const seqArray = new SeqArray(k).build(priceArray);
    console.log(seqArray.seqTotal());
    // iterate through remaining members of priceArray and add each to SeqArray.
    // each new element after seqArray has been built is a new window.
    priceArray.forEach(price => {
        seqArray.add(price);
        console.log(seqArray.seqTotal());
    });
}

module.exports = SeqAnalysis