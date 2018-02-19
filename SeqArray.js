const Seq = require('./Seq.js')
const addToSeqs = function(i,type,seqsArr){
    if (seqsArr.length === 0 || seqsArr[seqsArr.length - 1].type !== type) {
        seqsArr.push(new Seq(i - 1, 2, type));
        console.log('new seq',i)
    } else {
        console.log('adding to length',i)
        seqsArr[seqsArr.length - 1].length++;
    }
}
class SeqArray {
    constructor(k){
        this.seqs = [];
        this.windowSize = k;
    }

    build(prices){
        let last = prices.shift();
        for (let i=1; i<this.windowSize; i++){
            let curr = prices.shift();
            if (curr > last){
                addToSeqs(i,1,this.seqs);
            }else if (curr === last){
                addToSeqs(i,0,this.seqs);
            }else{
                addToSeqs(i,-1,this.seqs);
            }
            last = curr;
        }
    return this;
    }
}

module.exports = SeqArray;