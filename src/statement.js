///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////

function statement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US", 
            {
                style: "currency", currency: "USD", 
                minimumFractionDigits: 2
            }).format;

    for (let perf of invoice.performances) {
        let thisAmount = amountFor(perf);
        let play = playFor(perf);

        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);

        //add extra credit for every ten comedy attendees
        if ("comedy" === play.type) {
          volumeCredits += Math.floor(perf.audience / 5);  
        }

        // print line for this order
        result += `   ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;

    // Returns the performance's play
    function playFor (aPerformance) {
        return (plays[aPerformance.playID]);
    }

    // Returns the amount for a performance
    function amountFor(aPerformance) {
        const play = playFor(aPerformance);
        let thisAmount = 0;

        switch (play.type) {
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
                throw new Error (`Unknow type: ${play.type}`);        
        };
        return (thisAmount);
    }

}

module.exports = {statement};