const assert = require('assert');
const Calculator = require('./calculator');

describe('General functionality check.', () => {
    let calc;
    before(() => {
        calc = new Calculator();
    });
    it('Should return correct sum of 2 and 2.', () => {
        const expected = 4;
        const actual = calc.add(2, 2);
        assert.equal(actual, expected);
    });

    it('Should return correct difference of 5 and 2.', () => {
        const expected = 3;
        const actual = calc.subtract(5, 2);
        assert.equal(actual, expected);
    });

    it('Should return correct product of 10 and -2.', () => {
        const expected = -20;
        const actual = calc.multiply(10, -2);
        assert.equal(actual, expected);
    });

    it('Should return correct result of division of 10 and -2.', () => {
        const expected = -5;
        const actual = calc.divide(10, -2);
        assert.equal(actual, expected);
    });

    it('Should return correct result of sqrt of 144.', () => {
        const expected = 12;
        const actual = calc.sqrt(144);
        assert.equal(actual, expected);
    });

    it('Should return correct result of pow in degree 10 in 3.', () => {
        const expected = 1000;
        const actual = calc.pow(10, 3);
        assert.equal(actual, expected);
    });
});

describe('Check an Error thrown', () => {
    let calc;
    before(() => {
        calc = new Calculator();
    });
    describe('In specific cases an Error should be thrown.', () => {
        it('Should throw Error with text "Inputs should be numbers." if inputs are not numbers.', () => {
            assert.throws(() => calc._validateInput('sum', 'sad', 'nan'), Error, 'Inputs should be numbers.');
        });

        it('Should throw Error with text "It is forbidden to take a square from a negative number." if input are not positive number.', () => {
            assert.throws(() => calc.sqrt(-144), Error, 'It is forbidden to take a square from a negative number.');
        });

        it('Should throw Error with text "Division by zero is prohibited." if divisor are equal to zero.', () => {
            assert.throws(() => calc.divide(12, 0), Error, 'Division by zero is prohibited.');
        });
    });

    describe('Not throw an Error if everything is good.', () => {
        it('Should not throw Error if inputs are numbers.', () => {
            assert.doesNotThrow(() => calc._validateInput(1, 2, 3));
        });

        it('Should not throw Error if input are positive number.', () => {
            assert.doesNotThrow(() => calc.sqrt(144));
        });

        it('Should not throw Error if divisor are not equal to zero.', () => {
            assert.doesNotThrow(() => calc.divide(12, 1));
        });
    });
});


