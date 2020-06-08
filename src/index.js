///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////

//const  { statement} = require ('./statement');
const  { htmlStatement } = require ('./statement');

// Get the plays
const plays = require('./plays.json');

// Get the invoices
const invoices = require('./invoices.json');

for (let inv of invoices) {
    const invoice_msg = statement (inv, plays);
    console.log (invoice_msg);
}

for (let inv of invoices) {
    const invoice_msg = htmlStatement (inv, plays);
    console.log (invoice_msg);
}
