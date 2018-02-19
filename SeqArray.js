const Seq = require('./Seq.js')
const addToSeqs = function(type,seqsArr){
    if (seqsArr.length === 0 || seqsArr[seqsArr.length - 1].type !== type) {
        seqsArr.push(new Seq(2, type));
    } else {
        seqsArr[seqsArr.length - 1].length++;
    }
}
class SeqArray {
    constructor(k){
        this.seqs = [];
        this.windowSize = k;
        this.last = null;
    }
    seqTotal(){
        let sum = 0;
        this.seqs.forEach((seq)=>{
            console.log(sum,seq, ((seq.length * seq.length) - seq.length) / 2)
            if (seq.type !== 0){
                sum += ((seq.length * seq.length) - seq.length)/2 * seq.type;
            }
        })
        return(sum)
    }
    build(prices){
        this.last = prices.shift();
        for (let i=1; i<this.windowSize; i++){
            let curr = prices.shift();
            if (curr > this.last){
                addToSeqs(1,this.seqs);
            }else if (curr === this.last){
                addToSeqs(0,this.seqs);
            }else{
                addToSeqs(-1,this.seqs);
            }
            this.last = curr;
        }
    return this;
    }
    // decrements/removes the first sequence
    // incriments the last sequence or starts new one
    add(currentPrice){
        // console.log('start',currentPrice, this.seqs)
        //decrement the first sequence
        this.seqs[0].length--
        // if its now empty delete it
        if (this.seqs[0].length < 2){
            this.seqs.shift();
        }
        //incriment the last sequence or start a new one
        if (currentPrice > this.last) {
            this.addToSeqs(1);
        } else if (currentPrice === this.last) {
            this.addToSeqs(0);
        } else {
            this.addToSeqs(-1);
        }
        // console.log('after',currentPrice,this.seqs)
        this.last = currentPrice;
    }
    // checks to see if the new element continues the last sequence
    // if it doesnt a new sequence is started
    // else the last sequenec is incrimented
    addToSeqs(type){
        const length = this.seqs.length
        if (this.seqs[length - 1].type !== type) {
            this.seqs.push(new Seq(2, type));
        } else {
            this.seqs[length - 1].length++;
        }
    }
}

module.exports = SeqArray;