/**
 * random
 */
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

module.exports = () => {
    Math.randomFloatRange = function(min, max){
        return this.random() * (max - min) + min;
    }
    Math.randomRange = function(min, max){
        return this.floor(this.random() * (max - min)) + min;
    }

    Array.prototype.random = function(){
        return this[Math.randomRange(0, this.length)];
    };

    Array.prototype.randomProb = function(comparator){
        let sum = 0;
        for (var el in this) {
            if (this.hasOwnProperty(el)) {
                let probability = comparator(this[el]);
                if(probability > 0)
                    sum += probability;
            }
        }

        let chosenOne = Math.randomFloatRange(0, sum);

        for (var el in this) {
            if (this.hasOwnProperty(el)) {
                let probability = comparator(this[el]);
                if(probability > 0){
                    if(chosenOne < probability){
                        return this[el];
                    } else {
                        chosenOne -= probability;
                    }
                }
            }
        }
    }

    Array.prototype.sum = function(){
        let sum = 0;
        for (var el in this) {
            if (this.hasOwnProperty(el) && !isNaN(this[el])) {
                sum += this[el];
            }
        }
        return sum;
    }

    Array.prototype.avg = function(){
        if(this.length === 0)
            return null;
        return this.sum()/this.length;
    }

    Array.prototype.stdDev = function(){
        let std = new stdDev();
        for (var el in this) {
            if (this.hasOwnProperty(el)) {
                std.addValue(this[el]);
            }
        }
        return std.get();
    }

    Object.attributes = function(obj){
        let cleanAttributes = Object.keys(obj).filter(v => {
            return (typeof obj[v] !== 'function');
        });
        let ret = {};
        for (var el in cleanAttributes) {
            if (cleanAttributes.hasOwnProperty(el)) {
                ret[cleanAttributes[el]] = obj[cleanAttributes[el]];
            }
        }
        return ret;
    }
};
