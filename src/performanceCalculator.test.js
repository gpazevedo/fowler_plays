///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////

const  { PerformanceCalculator } = require ('./performanceCalculator');

// Testing with sinthetic intakes
let sInvoices = [
    {
        "customer": "BigCo",
        "performances": [
            {
                "playID": "hamlet",
                "audience": 55
            },
            {
                "playID": "as-like",
                "audience": 35
            },
            {
                "playID": "othello",
                "audience": 40
            }
            
        ]
    }
];

let sPlays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
};

let performance = sInvoices[0].performances[0];
let play = sPlays[performance.playID];
let calculator = new PerformanceCalculator (performance, play);

test ('Amount', () => {
    expect(calculator.amount).toBe(65000);
});

test ('volumeCredits', () => {
    expect(calculator.volumeCredits).toBe(25);
});



// Testing with the actual intakes:
// Get the plays
var plays = require('./plays.json');

// Get the invoices
var invoices = require('./invoices.json');

performance = invoices[0].performances[0];
play = plays[performance.playID];
calculator = new PerformanceCalculator (performance, play);

test ('Amount', () => {
    expect(calculator.amount).toBe(65000);
});

test ('volumeCredits', () => {
    expect(calculator.volumeCredits).toBe(25);
});

