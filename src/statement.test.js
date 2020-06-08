///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////

const  { statement } = require ('./statement');


const result = `Statement for BigCo
   Hamlet: $650.00 (55 seats)
   As You Like It: $580.00 (35 seats)
   Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`;

// Get the plays
const plays = require('./plays.json');

// Get the invoices
const invoices = require('./invoices.json');

let invoice_msg
for (let inv of invoices) {
    invoice_msg = statement (inv, plays);
}

test ('Total Statement', () => {
    expect(invoice_msg).toBe(result);
});
