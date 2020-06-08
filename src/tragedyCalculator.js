///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////
const  { PerformanceCalculator } = require ('./performanceCalculator');

class TragedyCalculator extends PerformanceCalculator {
    get amount () {
        let thisAmount = 40000;
        if (this.performance.audience > 30) {
            thisAmount += 1000 * (this.performance.audience - 30);
        }
         return (thisAmount);
    }
}
module.exports = {TragedyCalculator}
