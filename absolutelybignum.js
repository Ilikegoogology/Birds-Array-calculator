// absolutelybignum.js

class AbsolutelyBigNum {
    constructor(value) {
        if (typeof value === 'string' || typeof value === 'number') {
            this.value = BigInt(value);
        } else if (value instanceof AbsolutelyBigNum) {
            this.value = value.value;
        } else {
            throw new Error("Invalid input type for AbsolutelyBigNum");
        }
    }

    add(other) {
        other = this._convertToBigNum(other);
        return new AbsolutelyBigNum(this.value + other.value);
    }

    multiply(other) {
        other = this._convertToBigNum(other);
        return new AbsolutelyBigNum(this.value * other.value);
    }

    pow(exponent) {
        exponent = this._convertToBigNum(exponent);
        return new AbsolutelyBigNum(this.value ** exponent.value);
    }

    tetrate(height) {
        height = Number(height); // Assuming height is manageable
        let result = new AbsolutelyBigNum(this.value);
        for (let i = 1; i < height; i++) {
            result = this.pow(result);
        }
        return result;
    }

    toString() {
        return this.value.toString();
    }

    // Private method to ensure consistent type for operations
    _convertToBigNum(value) {
        if (!(value instanceof AbsolutelyBigNum)) {
            return new AbsolutelyBigNum(value);
        }
        return value;
    }
}

// Example of usage:
// let num = new AbsolutelyBigNum(10);
// let result = num.tetrate(2); // This is 10^(10) in this example
// console.log(result.toString());

