const Seq = require('./Seq.js')


const nSum = (n) =>((n * n) - n)/2;  

// the SeqArray keeps an array of sequences, each of which has a length and a type (1,0,-1) and is instantiated with a windowSize
// first it needs to build a windows worth of entries using build() then add(el) each element as you read it.
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
    // this is used to add to sequences during build, it checks for the seqsArray being empty
    addToSeqsBuild(type) {
        if (this.seqs.length === 0 || this.seqs[this.seqs.length - 1].type !== type) {
            this.seqs.push(new Seq(2, type));
        } else {
            this.seqs[this.seqs.length - 1].length++;
        }
    }
    // iterates through k elements of the Price array, adding to the last sequence or creating a new sequence
    build(prices){
        this.last = prices[0];
        for (let i=1; i<this.windowSize; i++){
            let curr = prices[i];
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
        //decrement the first sequence
        this.seqs[0].length--
        // if its is too small to have subsequence delete it
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
        this.last = currentPrice;
    }
    // checks to see if the new element continues the last sequence
    // if it doesnt a new sequence is started
    // else the last sequence is incrimented
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