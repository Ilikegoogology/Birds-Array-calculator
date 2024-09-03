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
        if (!(other instanceof AbsolutelyBigNum)) {
            throw new Error("Argument must be an instance of AbsolutelyBigNum.");
        }
        return new AbsolutelyBigNum(this.value + other.value);
    }

    // Subtraction
    subtract(other) {
        if (!(other instanceof AbsolutelyBigNum)) {
            throw new Error("Argument must be an instance of AbsolutelyBigNum.");
        }
        return new AbsolutelyBigNum(this.value - other.value);
    }

    // Multiplication
    multiply(other) {
        if (!(other instanceof AbsolutelyBigNum)) {
            throw new Error("Argument must be an instance of AbsolutelyBigNum.");
        }
        return new AbsolutelyBigNum(this.value * other.value);
    }

    // Division
    divide(other) {
        if (!(other instanceof AbsolutelyBigNum)) {
            throw new Error("Argument must be an instance of AbsolutelyBigNum.");
        }
        return new AbsolutelyBigNum(this.value / other.value);
    }

    // Power (exponentiation)
    power(exp) {
        if (typeof exp !== 'bigint') {
            exp = BigInt(exp);
        }
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
        if (typeof height !== 'bigint') {
            height = BigInt(height);
        }
        if (height === 0n) return new AbsolutelyBigNum(BigInt(1));
        if (height === 1n) return new AbsolutelyBigNum(this.value);
        let result = new AbsolutelyBigNum(this.value);
        for (let i = BigInt(1); i < height; i++) {
            result = this.power(result.value);
        }
        return result;
    }

    // Convert to string
    toString() {
        return this.value.toString();
    }

    // Print value
    print() {
        console.log(this.toString());
    }
}

// Example usage:
let num = new AbsolutelyBigNum("2");
let result = num.tetrate(5);
result.print(); // This will print an extremely large number

module.exports = AbsolutelyBigNum;
