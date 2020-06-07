///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////
module.exports = {createStatementData}

function createStatementData (invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);

    return statementData;

    function enrichPerformance(aPerformance) {
        let result = Object.assign({}, aPerformance);
        result.play = playFor (result);
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }

    // Returns the performance's play
    function playFor (aPerformance) {
        return (plays[aPerformance.playID]);
    };

    // Returns the amount for a performance
    function amountFor(aPerformance) {
        let thisAmount = 0;

        switch (aPerformance.play.type) {
            case "tragedy":
                thisAmount += 40000;
                if (aPerformance.audience > 30) {
                    thisAmount += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if (aPerformance.audience > 20) {
                    thisAmount += 10000 + 500 * (aPerformance.audience - 20);
                }
                thisAmount += 300 * aPerformance.audience;
                break;
            default:
                throw new Error (`Unknow type: ${aPerformance.play.type}`);        
        };
        return (thisAmount);
    }

    // Returns the volume credits
    function volumeCreditsFor(aPerformance) {
        // add volume credits
        let volumeCredits = Math.max(aPerformance.audience - 30, 0);

        //add extra credit for every ten comedy attendees
        if ("comedy" === aPerformance.play.type) {
            volumeCredits += Math.floor(aPerformance.audience / 5);  
        }
        return volumeCredits;
     };

     function totalVolumeCredits (data) {
       return data.performances.reduce((total, p) => total + p.volumeCredits,0);
    }

    function totalAmount (data) {
        return data.performances.reduce((total, p) => total + p.amount,0);
    }
}

