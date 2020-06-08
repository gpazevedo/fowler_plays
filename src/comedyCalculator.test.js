///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////

const  { ComedyCalculator } = require ('./comedyCalculator');

// Testing with sinthetic intakes
const sInvoices = [
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

const sPlays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
};


const performance = sInvoices[0].performances[1]; //as-like comedy
const play = sPlays[performance.playID];
const calculator = new ComedyCalculator (performance, play);

test ('Amount', () => {
    expect(calculator.amount).toBe(58000);
});

test ('volumeCredits', () => {
    expect(calculator.volumeCredits).toBe(12);
});
