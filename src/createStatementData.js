///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////
module.exports = {createStatementData}
const  { PerformanceCalculator } = require ('./performanceCalculator');


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

