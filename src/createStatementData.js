///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////
module.exports = {createStatementData}

class PerformanceCalculator {
    constructor (aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount () {
        let thisAmount = 0;

        switch (this.play.type) {
            case "tragedy":
                thisAmount += 40000;
                if (this.performance.audience > 30) {
                    thisAmount += 1000 * (this.performance.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if (this.performance.audience > 20) {
                    thisAmount += 10000 + 500 * (this.performance.audience - 20);
                }
                thisAmount += 300 * this.performance.audience;
                break;
            default:
                throw new Error (`Unknow type: ${this.performance.play.type}`);        
        };
        return (thisAmount);
    }

    get volumeCredits () {
        // add volume credits
        let volumeCredits = Math.max(this.performance.audience - 30, 0);

        //add extra credit for every ten comedy attendees
        if ("comedy" === this.play.type) {
            volumeCredits += Math.floor(this.performance.audience / 5);  
        }
        return volumeCredits;
    }
}

function createStatementData (invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);

    return statementData;

    function enrichPerformance(aPerformance) {
        const calculator = new PerformanceCalculator (aPerformance, playFor(aPerformance));
        let result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }

    // Returns the performance's play
    function playFor (aPerformance) {
        return (plays[aPerformance.playID]);
    };


    function totalVolumeCredits (data) {
       return data.performances.reduce((total, p) => total + p.volumeCredits,0);
    }

    function totalAmount (data) {
        return data.performances.reduce((total, p) => total + p.amount,0);
    }
}

