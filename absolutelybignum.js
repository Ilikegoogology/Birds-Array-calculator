// absolutelybignum.js

class AbsolutelyBigNum {
    constructor(value) {
        if (typeof value === 'string') {
            this.value = BigInt(value);
        } else if (typeof value === 'bigint') {
            this.value = value;
        } else {
            throw new Error("Invalid type for AbsolutelyBigNum. Expected string or bigint.");
        }
    }

    // Addition
    add(other) {
        this._checkType(other);
        return new AbsolutelyBigNum(this.value + other.value);
    }

    // Subtraction
    subtract(other) {
        this._checkType(other);
        return new AbsolutelyBigNum(this.value - other.value);
    }

    // Multiplication
    multiply(other) {
        this._checkType(other);
        return new AbsolutelyBigNum(this.value * other.value);
    }

    // Division
    divide(other) {
        this._checkType(other);
        return new AbsolutelyBigNum(this.value / other.value);
    }

    // Power (exponentiation)
    power(exp) {
        exp = this._convertToBigInt(exp);
        return new AbsolutelyBigNum(this.value ** exp);
    }

    // Factorial (for large numbers)
    factorial() {
        let result = BigInt(1);
        for (let i = BigInt(2); i <= this.value; i++) {
            result *= i;
        }
        return new AbsolutelyBigNum(result);
    }

    // Tetration (4th hyperoperation)
    tetrate(height) {
        height = this._convertToBigInt(height);
        if (height === 0n) return new AbsolutelyBigNum(1n);
        if (height === 1n) return new AbsolutelyBigNum(this.value);
        let result = new AbsolutelyBigNum(this.value);
        for (let i = 1n; i < height; i++) {
            result = this.power(result.value);
        }
        return result;
    }

    // Convert to string
    toString() {
        return this.value.toString();
    }

    // Convert to scientific notation
    toScientificNotation(digits = 6) {
        const strValue = this.toString();
        const length = strValue.length;

        if (length <= digits) {
            return strValue;
        }

        const significand = strValue.slice(0, digits);
        const exponent = length - digits;

        return `${significand}e+${exponent}`;
    }

    // Convert very large exponents to scientific notation with nested exponents
    toExtendedScientificNotation(digits = 6) {
        const strValue = this.toString();
        const length = strValue.length;

        if (length <= digits) {
            return strValue;
        }

        const splitLength = 4; // Arbitrary split length for better readability
        const parts = [];
        let tempLength = length;

        while (tempLength > digits) {
            const chunk = Math.min(tempLength, splitLength);
            parts.unshift(strValue.slice(-chunk));
            strValue = strValue.slice(0, -chunk);
            tempLength -= chunk;
        }

        parts.unshift(strValue);
        return parts.join('e+');
    }

    // Print value
    print() {
        console.log(this.toString());
    }

    // Private helper methods
    _checkType(other) {
        if (!(other instanceof AbsolutelyBigNum)) {
            throw new Error("Argument must be an instance of AbsolutelyBigNum.");
        }
    }

    _convertToBigInt(value) {
        return typeof value === 'bigint' ? value : BigInt(value);
    }
}

// Example usage:
// let num = new AbsolutelyBigNum("2");
// let result = num.tetrate(5);
// console.log(result.toExtendedScientificNotation()); // This will print the result in extended scientific notation

module.exports = AbsolutelyBigNum;
