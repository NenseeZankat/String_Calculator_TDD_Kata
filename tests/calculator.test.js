import { describe,test , it , expect } from "vitest";

import calculator from "../src/calculator.js";

describe("calculator", () => {

    //simplest test case of an empty string and move to one and two numbers

    describe('simplest case',() => {
        checkResult("", 0);
        checkResult(" ", 0);
        checkResult("2", 2);
        checkResult("12", 12);
    });

    //Allow the Add method to handle an unknown amount of numbers

    describe('with comma as separator',() => {
        checkResult("1,2", 3);
        checkResult("1,2,3", 6);
        checkResult("1,2,3,4", 10);
    });

    //Allow the Add method to handle new lines between numbers (instead of commas).
    describe('with newline as separator',() => {
        checkResult("1\n2", 3);
        checkResult("1\n2\n3", 6);
        checkResult("1\n2\n3\n4", 10);
    })

    //Allow the Add method to handle new lines and commas as separators.
    describe('with comma and newline as separator',() => {
        checkResult("1\n2", 3);
        checkResult("1\n2,3", 6);
        checkResult("1\n2,3,4", 10);
        checkResult("1,2\n3", 6);
        checkResult("1,2\n3,4", 10);
        checkResult("1,2\n3,4,5", 15);

    })

    //Support different delimiters
    describe('with custom delimiter',() => {
        checkResult("//;\n1;2", 3);
        checkResult("//;\n1;2;3", 6);
        checkResult("//;\n1,2\n3,4", 10);
    });

    //Calling Add with a negative number will throw an exception “negatives not allowed” - and the negative that was passed. 
    //if there are multiple negatives, show all of them in the exception message.
    describe('with negative numbers',() => {
        it('should throw an error for negative numbers', () => {
            expect(() => calculator.add("1,-2")).toThrow("negatives not allowed: -2");
            expect(() => calculator.add("1,-2,-3")).toThrow("negatives not allowed: -2, -3");
            expect(() => calculator.add("-1,2,-3")).toThrow("negatives not allowed: -1, -3");
        });
    });

    //Numbers bigger than 1000 should be ignored, so adding 2 + 1001 = 2
    describe('with numbers greater than 1000', () => {
        checkResult("2,1001", 2);
        checkResult("1000,1001", 1000);
        checkResult("1000,2000", 1000);
        checkResult("1001,2000", 0);
    });

    //delimiters can be of any length
    describe('with long custom delimiters', () => {
        checkResult("//[***]\n1***2", 3);
        checkResult("//[??]\n1??2??3", 6);
        checkResult("//[.,]\n1\n2.,3", 6);
    });


    function checkResult(expression, expected) {
        it(`should evaluate "${expression}" to ${expected}`, () => {
            expect(calculator.add(expression)).toBe(expected);
        });
    }
});
