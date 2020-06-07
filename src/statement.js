///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////
function statement (invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);

    let textFormated = renderPlainText (statementData)
    return textFormated;

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
        let result = 0;
        for (let perf of data.performances) {
            result += perf.volumeCredits;
        }
        return result;
    }

    function totalAmount (data) {
        let result = 0;
        for (let perf of data.performances) {
            result += perf.amount;
        }
        return result;
    }
}

function renderPlainText (data) {
    let locale = "en-US";  // Its possible any locales
    let result = `Statement for ${data.customer}\n`;

    for (let perf of data.performances) {
        // print line for this order
        result += `   ${perf.play.name}: ${format(perf.amount/100, locale)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${format(data.totalAmount/100, locale)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;

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