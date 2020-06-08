///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////

class PerformanceCalculator {
    constructor (aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount () {
       return 0;
    }

    get volumeCredits () {
        return Math.max(this.performance.audience - 30, 0);
    }
}
module.exports = {PerformanceCalculator}
