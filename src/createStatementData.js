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
    };

    get amount () {
        throw new Error ("Subclass responsability!");
    }

    get volumeCredits () {
        // Standard volume credits
        return Math.max(this.performance.audience - 30, 0);
    }
}

class TragedyCalculator extends PerformanceCalculator {
    get amount () {
        let thisAmount = 40000;
        if (this.performance.audience > 30) {
            thisAmount += 1000 * (this.performance.audience - 30);
        }
        return (thisAmount);
    }
};

class ComedyCalculator extends PerformanceCalculator {
    get amount () {
        let thisAmount = 30000;
        if (this.performance.audience > 20) {
            thisAmount += 10000 + 500 * (this.performance.audience - 20);
        }
        thisAmount += 300 * this.performance.audience;
        return (thisAmount);
    }

    get volumeCredits () {
        return super.volumeCredits + Math.floor(this.performance.audience / 5);  
    }
};

function createStatementData (invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);

    return statementData;

    function enrichPerformance(aPerformance) {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
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

    function createPerformanceCalculator(aPerformance, aPlay) {
        switch (aPlay.type) {
            case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
            case "comedy": return new ComedyCalculator(aPerformance, aPlay);
        
            default:
                throw new Error(`Unknow play type: ${aPlay.type}`)
        }
    };
}
