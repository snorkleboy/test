const Seq = require('./Seq.js')
class SeqArray {
    constructor(k){
        this.seqs = [];
        this.windowSize = k;
    }

    build(prices){
        let last = prices.shift();
    }
}

module.exports = SeqArray;