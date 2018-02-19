const Seq = require('./Seq.js')
// this will hold the results of any sequence number calculation so that
// the answer to the same sequence wont need to be calculated twice
const nSums = {};
const nSum = (n) => (
    nSums[n] ?
        nSums[n]
    :
        nSums[n] = ((n * n) - n) / 2
)
   
class SeqArray {
    constructor(k){
        this.seqs = [];
        this.windowSize = k;
        this.last = null;
    }
    seqTotal(){
        let sum = 0;
        this.seqs.forEach((seq)=>{
            if (seq.type !== 0){
                sum += nSum(seq.length) * seq.type;
            }
        })
        return(sum)
    }
    addToSeqsBuild(type) {
        if (this.seqs.length === 0 || this.seqs[this.seqs.length - 1].type !== type) {
            this.seqs.push(new Seq(2, type));
        } else {
            this.seqs[this.seqs.length - 1].length++;
        }
    }
    build(prices){
        this.last = prices.shift();
        for (let i=1; i<this.windowSize; i++){
            let curr = prices.shift();
            if (curr > this.last){
                this.addToSeqsBuild(1);
            }else if (curr === this.last){
                this.addToSeqsBuild(0);
            }else{
                this.addToSeqsBuild(-1);
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