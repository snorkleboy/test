const Seq = require('./Seq.js')


const nSum = (n,type) =>((n * n) - n)/2 * type;  

// the SeqArray keeps an array of sequences, each of which has a length and a type (1,0,-1) and is instantiated with a windowSize
// first it needs to build a windows worth of entries using build() then add(el) each element as you read it.
class SeqArray {
    constructor(k){
        this.seqs = [];
        this.windowSize = k;
        this.last = null;
        this.seqTotal = null;
    }
    seqTotalBuild(){
        let sum = 0;
        this.seqs.forEach((seq)=>{
            if (seq.type !== 0){
                sum += nSum(seq.length, seq.type);
            }
        })
        this.seqTotal = sum;
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
        this.last = parseInt(prices[0]);
        for (let i=1; i<this.windowSize; i++){
            let curr = parseInt(prices[i]);

            if (curr > this.last){
                this.addToSeqsBuild(1);
            }else if (curr === this.last){
                this.addToSeqsBuild(0);
            }else{
                this.addToSeqsBuild(-1);
            }
            this.last = curr;
        }
        this.seqTotalBuild();
        return this;
    }
    // decrements/removes the first sequence
    // increments the last sequence or starts new one
    add(price){
        const originalFirstSeqTotal = nSum(this.seqs[0].length, this.seqs[0].type)
        const currentPrice = parseInt(price)
        //decrement the first sequence
        this.seqs[0].length--
        // if its is too small to have subsequence delete it
        if (this.seqs[0].length < 2){
            this.seqs.shift();
            this.seqTotal = this.seqTotal - originalFirstSeqTotal;
        }else{
            const newFirstSeqTotal = nSum(this.seqs[0].length, this.seqs[0].type)
            this.seqTotal = this.seqTotal -originalFirstSeqTotal + newFirstSeqTotal
        }
        //increment the last sequence or start a new one
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
    // else the last sequence is incremented
    addToSeqs(type){
        const length = this.seqs.length
        if (this.seqs[length - 1].type !== type) {
            const newSeq = new Seq(2, type)
            this.seqs.push(newSeq);
            this.seqTotal = this.seqTotal + nSum(newSeq.length, newSeq.type)
        } else {
            const oldLast = this.seqs[length - 1];
            const oldlastSeqTotal = nSum(oldLast.length,oldLast.type);
            oldLast.length++;
            const newLast = this.seqs[length - 1];
            this.seqTotal = this.seqTotal - oldlastSeqTotal + nSum(newLast.length, newLast.type)
        }
    }
}

module.exports = SeqArray;