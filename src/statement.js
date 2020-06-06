///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////

function statement (invoice, plays) {
    let locale = "en-US";  // Its possible any locales
    let result = `Statement for ${invoice.customer}\n`;

    for (let perf of invoice.performances) {
        // print line for this order
        result += `   ${playFor(perf).name}: ${format(amountFor(perf)/100, locale)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${format(totalAmountFor(invoice)/100, locale)}\n`;
    result += `You earned ${volumeCreditsFor(invoice)} credits\n`;
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

    // Returns the volume credits from an Invoice
    function volumeCreditsFor (aInvoice) {
        let volumeCredits = 0;

        for (let perf of aInvoice.performances) {

            // add volume credits
            volumeCredits += Math.max(perf.audience - 30, 0);

            //add extra credit for every ten comedy attendees
            if ("comedy" === playFor(perf).type) {
                volumeCredits += Math.floor(perf.audience / 5);  
            }
        }
        return volumeCredits;
    };

    // Returns the total amount for an Invoice
    function totalAmountFor(aInvoice) {
        let totalAmount = 0;

        for (let perf of aInvoice.performances) {
            totalAmount += amountFor(perf);
        }
        return totalAmount;
    }

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