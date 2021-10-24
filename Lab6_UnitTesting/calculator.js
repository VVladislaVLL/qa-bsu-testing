class Calculator {
    add(num1, num2) {
        this._validateInput(num1, num2);
        return num1 + num2;
    }

    subtract(num1, num2) {
        this._validateInput(num1, num2);
        return num1 - num2;
    }

    multiply(num1, num2) {
        this._validateInput(num1, num2);
        return num1 * num2;
    }

    divide(num1, num2) {
        this._validateInput(num1, num2)
        if (num2 === 0) {
            throw Error('Division by zero is prohibited.');
        }
        return num1 / num2;
    }

    pow(num, degree) {
        this._validateInput(num, degree)
        let result = 1;
        for (let i = 0; i < degree; i++) {
            result *= num;
        }
        return result;
    }

    sqrt(num) {
        this._validateInput(num);
        if (num < 0) {
            throw Error('It is forbidden to take a square from a negative number.')
        }
        return num ** (1/2);
    }

    _validateInput(...args) {
        const flag =  [...args].some((arg) => isNaN(arg));
        if (flag) {
            throw Error('Inputs should be numbers.');
        }
    }

}

module.exports = Calculator;