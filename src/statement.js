///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////

function statement (invoice, plays) {
    let locale = "en-US";  // Its possible any locales
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;

    for (let perf of invoice.performances) {
        let thisAmount = amountFor(perf);

        // add volume credits
        volumeCredits += volumeCreditsFor (perf);

        // print line for this order
        result += `   ${playFor(perf).name}: ${format(thisAmount/100, locale)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount/100, locale)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;

    // Returns the performance's play
    function playFor (aPerformance) {
        return (plays[aPerformance.playID]);
    };

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

    // Returns the volume credits from a Performance
    function volumeCreditsFor (aPerformance) {
        // add volume credits
        let volumeCredits = Math.max(aPerformance.audience - 30, 0);

        //add extra credit for every ten comedy attendees
        if ("comedy" === playFor(aPerformance).type) {
            volumeCredits += Math.floor(aPerformance.audience / 5);  
        }
        return volumeCredits;
    };

    // Formats a numbers according to its locale
    function format(aNumber, locale) {
        let result;
        switch (locale) {
            case "en-US":
                result = new Intl.NumberFormat("en-US", 
                {
                    style: "currency", currency: "USD", 
                    minimumFractionDigits: 2
                }).format(aNumber);
                break;
        
            default:
                break;
        }
        return result;
    }
}

module.exports = {statement}