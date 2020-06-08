///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////
const  { PerformanceCalculator } = require ('./performanceCalculator');

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
module.exports = {ComedyCalculator};
