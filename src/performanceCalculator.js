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
module.exports = {PerformanceCalculator}
