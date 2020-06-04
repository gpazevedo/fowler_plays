///////////////////////////////////////////////////////////////////////////////
//
//   Refactoring Chapter 4
//
///////////////////////////////////////////////////////////////////////////////
const {Province} = require('./Province')

function sampleProvinceData() {
    return {
        name: "Asia",
        producers: [
            {name: "Byzantium", cost: 10, production: 9},
            {name: "Attalia", cost: 12, production: 10},
            {name: "Sinope", cost: 10, production: 6},
        ],
        demand: 30,
        price:20
    };
};


describe('testing Province', () => {
    let prov;
    beforeEach(function(){
        prov = new Province(sampleProvinceData());
    })
    it ('Constructor', () => {
        expect(new Province(sampleProvinceData())).toEqual(prov);
        prov.price = 50;
    });

    it ('shortfall', () => {
        expect(prov.shortfall).toBe(5);
    });

    it ('profit', () => {
        expect(prov.profit).toBe(230);
    });

    it ('Change production: shortfall', () => {
        prov.producers[0].production = 20;
        expect(prov.shortfall).toBe(-6);
    });

    it ('Change production: profit', () => {
        prov.producers[0].production = 20;
        expect(prov.profit).toBe(292);
    });

    it ('Zero demand: shortfall', () => {
        prov.demand = 0;
        expect(prov.shortfall).toBe(-25);
    });

    it ('Zero demand: profit', () => {
        prov.demand = 0;
        expect(prov.profit).toBe(0);
    });

    it ('Negative demand: shortfall', () => {
        prov.demand = -10;
        expect(prov.shortfall).toBe(-35);
    });

    it ('Negative demand: profit', () => {
        prov.demand = -10;
        expect(prov.profit).toBe(-100);
    });

    it ('empty string demand: shortfall', () => {
        prov.demand = "";
        expect(prov.shortfall).toBe(NaN);
    });

    it ('empty string demand: profit', () => {
        prov.demand = "";
        expect(prov.profit).toBe(NaN);
    });

});

describe('testing Province', () => {
    let noProducers;
    beforeEach(function (){
        const data = {
            name: "No producers",
            producers: [],
            demand: 30,
            price: 20
        };
        noProducers = new Province(data);
    });
    it('shortfall', function() {
        expect(noProducers.shortfall).toBe(30);
    })

    it('profit', function() {
        expect(noProducers.profit).toBe(0);
    })
});

// describe('Province: String producers', () => {
//     let noProducers;
//     beforeEach(function (){
//         const data = {
//             name: "String producers'",
//             producers: "",
//             demand: 30,
//             price: 20
//         };
//         noProducers = new Province(data);
//     });
//     it('shortfall', function() {
//         expect(noProducers.shortfall).toBe(30);
//     })

//     it('profit', function() {
//         expect(noProducers.profit).toBe(0);
//     })
// });