/**
 * random
 */
function defaultComp(a, b){
    if(a>b)
        return -1;
    if(a<b)
        return 1;
    return 0;
}
class Node {
    constructor() {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
        this.comparator = null;
        this.isMultiNode = false;
    }
    setKey(key){
        this.key = key;
        return this;
    }
    setValue(value){
        this.value = value;
        return this;
    }
    setComparator(comp){
        this.comparator = comp;
        return this;
    }
    newNode(key, value){
        if(this.key === null){
            this.setKey(key).setValue(value);
            return;
        }
        if(typeof this.comparator !== 'function')
            this.setComparator(defaultComp);
        let nNode = new Node();
        nNode.setKey(key).setValue(value).setComparator(this.comparator);
        this.addNode(nNode);
    }
    addNode(node){
        if(typeof this.comparator !== 'function')
            throw 'wrong comparator set';
        let eva = this.comparator(this.key, node.key);
        if(eva == -1){
            if(!nutil.isNullOrEmpty(this.left)){
                this.left.addNode(node);
            } else {
                this.left = node;
            }
        } else if(eva == 1){
            if(!nutil.isNullOrEmpty(this.right)){
                this.right.addNode(node);
            } else {
                this.right = node;
            }
        } else if(eva == 0){
            if(!this.isMultiNode){
                if(this.value !== node.value)
                    this.value = [this.value, node.value];
            } else {
                if(this.value.indexOf(node.value == -1))
                    this.value.push(node.value);
            }
        }
    }
    inOrder(){
        let ar = [];
        if(!nutil.isNullOrEmpty(this.left))
            ar = [...ar, ...this.left.inOrder()];
        ar.push(this);
        if(!nutil.isNullOrEmpty(this.right))
            ar = [...ar, ...this.right.inOrder()];
        return ar;
    }
    preOrder(){
        let ar = [];
        ar.push(this);
        if(!nutil.isNullOrEmpty(this.left))
            ar = [...ar, ...this.left.preOrder()];
        if(!nutil.isNullOrEmpty(this.right))
            ar = [...ar, ...this.right.preOrder()];
        return ar;
    }
    postOrder(){
        let ar = [];
        if(!nutil.isNullOrEmpty(this.left))
            ar = [...ar, ...this.left.postOrder()];
        if(!nutil.isNullOrEmpty(this.right))
            ar = [...ar, ...this.right.postOrder()];
        ar.push(this);
        return ar;
    }
    height(){
        let a = 1, b = 1;
        if(!nutil.isNullOrEmpty(this.left))
            a += this.left.height();
        if(!nutil.isNullOrEmpty(this.right))
            b += this.right.height();
        return nutil.max(a,b);
    }
}
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
 function helper(a, x){
     let partA = Math.pow(2,a*x)-Math.pow(2,-a*x);
     let partB = Math.pow(2,a)-Math.pow(2,-a);
     return partA/partB;
 }
 function helper2(a,x){
     return 0.5*helper(a,2*x-1)+0.5;
 }

let nutil = {};
nutil.setup = () => {
    Math.randomFloatRange = function(min, max){
        return this.random() * (max - min) + min;
    }
    Math.randomRange = function(min, max){
        return this.floor(this.random() * (max - min)) + min;
    }
    Math.skewedRandom = function(n){
        if(n <= 0)
            n = 0.0001;
        return helper2(n, Math.random());
    }
    Math.randomFloatRangeEx = function(min,max,source){
        return source() * (max - min) + min;
    }
    Math.randomRangeEx = function(min,max,source){
        return this.floor(source() * (max - min)) + min;
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
    Array.prototype.group = function(){
        var ret = [];
        for (var i = 0; i < this.length; i++) {
            if(typeof ret[this[i]] == 'undefined'){
                ret[this[i]] = 0;
            }
            ret[this[i]]++;
        }
        return ret;
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

    String.prototype.format = function(...args){
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    }
};
nutil.tree = Node;
nutil.isNullOrEmpty = function(item){
    return (item === null || typeof item ==='undefined');
}
nutil.min = function(a,b){
    return (a > b) ? b : a;
}
nutil.max = function(a,b){
    return (a < b) ? b : a;
}
nutil.clamp = function(n, min, max){
    if(n < min) return min;
    if(n > max) return max;
    return n;
}
module.exports = nutil;
