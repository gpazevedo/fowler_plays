///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////
module.exports = {createStatementData}
const  { TragedyCalculator } = require ('./tragedyCalculator');
const  { ComedyCalculator } = require ('./comedyCalculator');

function createStatementData (invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);

    return statementData;

    function enrichPerformance(aPerformance) {
        const calculator = createPerformanceCalculator (aPerformance, playFor(aPerformance));
        let result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }

    function createPerformanceCalculator(aPerformance, aPlay) {
        switch (aPlay.type) {
            case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
            case "comedy": return new ComedyCalculator(aPerformance, aPlay);
        
            default:
                throw new Error ("unknow play type!");
        }
    };

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
