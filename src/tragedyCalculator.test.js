///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 1
//
///////////////////////////////////////////////////////////////////////////////

const  { TragedyCalculator } = require ('./tragedyCalculator');

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


let performance = sInvoices[0].performances[0]; //hamlet tragedy
let play = sPlays[performance.playID];
let calculator = new TragedyCalculator (performance, play);

test ('Amount', () => {
    expect(calculator.amount).toBe(65000);
});

test ('volumeCredits', () => {
    expect(calculator.volumeCredits).toBe(25);
});
