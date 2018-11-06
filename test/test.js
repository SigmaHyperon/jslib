require('./../index.js')();
var assert = require('assert');
function stdDev(){
    this.buffer = [];
    this.addValue = function(v){
        this.buffer.push(v);
    };
    this.get = function(){
        let sum = 0;
        for (var el in this.buffer) {
            if (this.buffer.hasOwnProperty(el)) {
                sum += this.buffer[el];
            }
        }
        let avg = sum / this.buffer.length;
        let avgAcc = 0;
        for (var el in this.buffer) {
            if (this.buffer.hasOwnProperty(el)) {
                avgAcc += Math.pow((this.buffer[el] - avg), 2);
            }
        }
        let stdDev = Math.sqrt(avgAcc / (this.buffer.length - 1));
        return stdDev;
    }
}

describe('Math', function() {
    describe('#randomRange()', function(){
        it('should return values in the specified range', function() {
            for(let i = 0; i < 100; i++){
                let test = Math.randomFloatRange(0,5);
                assert.strictEqual((test >= 0 && test < 5), true);
            }
        });
        it('should have a certain stdDev', function() {
            let std = new stdDev();
            for(let i = 0; i < 100; i++){
                let test = Math.randomFloatRange(0,5);
                std.addValue(test);
            }
            assert.strictEqual((std.get() > 0), true);
        });
    });
    describe('#randomRange()', function(){
        it('should return values in the specified range', function() {
            for(let i = 0; i < 100; i++){
                let test = Math.randomRange(0,5);
                assert.strictEqual((test >= 0 && test < 5), true);
            }
        });
        it('should have a certain stdDev', function() {
            let std = new stdDev();
            for(let i = 0; i < 100; i++){
                let test = Math.randomRange(0,5);
                std.addValue(test);
            }
            assert.strictEqual((std.get() > 0), true);
        });
    });
});
describe('Array', function() {
    describe('#random()', function(){
        it('should return a random element', function() {
            for(let i = 0; i < 100; i++){
                let test = [0,1,2,3,4].random();
                assert.strictEqual((test >= 0 && test < 5), true);
            }
        });
        it('should have a certain stdDev', function() {
            let std = new stdDev();
            for(let i = 0; i < 100; i++){
                let test = [0,1,2,3,4].random();
                std.addValue(test);
            }
            assert.strictEqual((std.get() > 0), true);
        });
    });
    describe('#randomProb()', function(){
        it('should return a random element', function() {
            for(let i = 0; i < 100; i++){
                let test = [0,1,2,3,4].randomProb(e => e);
                assert.strictEqual((test >= 0 && test < 5), true);
            }
        });
        it('should have a certain stdDev', function() {
            let std = new stdDev();
            for(let i = 0; i < 100; i++){
                let test = [0,1,2,3,4].randomProb(e => e);
                std.addValue(test);
            }
            assert.strictEqual((std.get() > 0), true);
        });
        it('should ignore negative probabilities', function() {
            for(let i = 0; i < 100; i++){
                let test = [0,1,2,-3,4].randomProb(e => e);
                assert.strictEqual((test != -3), true);
            }
        });
    });
    describe('#sum()', function() {
        it('should calculate the correct sum', function() {
            assert.strictEqual([1,2,3].sum(), 6);
            assert.strictEqual([2,5,7,10].sum(), 24);
        });
        it('should ignore non-numerical values', function() {
            assert.strictEqual([1,null,3].sum(), 4);
            assert.strictEqual([2,5,NaN,10].sum(), 17);
        });
    });
    describe('#avg()', function() {
        it('should calculate the correct average', function() {
            assert.strictEqual([1,2,3].avg(), 2);
            assert.strictEqual([2,5,7,10].avg(), 6);
        });
        it('should deal with negative values', function() {
            assert.strictEqual([1,-2,3].avg(), 2/3);
            assert.strictEqual([2,-5,7,10].avg(), 3.5);
        });
    });
    describe('#stdDev()', function() {
        it('should calculate the correct stdDev', function() {
            assert.strictEqual([1,1,1].stdDev(), 0);
            assert.strictEqual([2,5,7,10].stdDev(), 3.366501646120693);
        });
    });
});
