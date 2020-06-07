///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////
const  { createStatementData } = require ('./createStatementData');
module.exports = {statement, htmlStatement}

function statement (invoice, plays) {
    return (renderPlainText (createStatementData (invoice, plays)));
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

}
function htmlStatement(invoice, plays) {
    return renderHtml (createStatementData(invoice, plays));
}

function renderHtml(data) {
    let locale = "en-US";  // Its possible any locales
    let result = `<h1>Statement for ${data.customer}<h1>\n`;
    result += "<table>\n";
    result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>\n";

    for (let perf of data.performances) {
        // print line for this order
        result += `   <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
        result += `<td>${format(perf.amount/100, locale)}</td></tr>\n`;
    }

    result += "</table>\n";
    result += `<p>Amount owed is <em>${format(data.totalAmount/100, locale)}</em></p>\n`;
    result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
    return result;
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
