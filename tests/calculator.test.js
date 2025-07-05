import { describe, test, it, expect } from "vitest";
import calculator from "../src/calculator.js";

describe("calculator", () => {

    //Basic input handling
    describe('simplest case', () => {
        // Should return 0 for empty or whitespace input
        checkResult("", 0);
        checkResult(" ", 0);

        // Should return the number itself if only one is provided
        checkResult("2", 2);
        checkResult("12", 12);
    });

    //Handle unknown number of inputs separated by commas
    describe('with comma as separator', () => {
        checkResult("1,2", 3);
        checkResult("1,2,3", 6);
        checkResult("1,2,3,4", 10);
    });

    //Support newline characters as valid separators
    describe('with newline as separator', () => {
        checkResult("1\n2", 3);
        checkResult("1\n2\n3", 6);
        checkResult("1\n2\n3\n4", 10);
    });

    //Support mix of commas and newline as separators
    describe('with comma and newline as separator', () => {
        checkResult("1\n2", 3);
        checkResult("1\n2,3", 6);
        checkResult("1\n2,3,4", 10);
        checkResult("1,2\n3", 6);
        checkResult("1,2\n3,4", 10);
        checkResult("1,2\n3,4,5", 15);
    });

    //Custom single-character delimiter support
    describe('with custom delimiter', () => {
        checkResult("//;\n1;2", 3);
        checkResult("//;\n1;2;3", 6);
        // Should still support commas and newlines even with custom delimiter
        checkResult("//;\n1,2\n3,4", 10);
    });

    //Should throw when input includes negative numbers
    describe('with negative numbers', () => {
        it('should throw an error for negative numbers', () => {
            expect(() => calculator.add("1,-2")).toThrow("negatives not allowed: -2");
            expect(() => calculator.add("1,-2,-3")).toThrow("negatives not allowed: -2, -3");
            expect(() => calculator.add("-1,2,-3")).toThrow("negatives not allowed: -1, -3");
        });
    });

    //Numbers greater than 1000 should be ignored
    describe('with numbers greater than 1000', () => {
        checkResult("2,1001", 2);
        checkResult("1000,1001", 1000);
        checkResult("1000,2000", 1000);
        checkResult("1001,2000", 0);
    });

    //Support custom delimiters with more than one character
    describe('with long custom delimiters', () => {
        checkResult("//[***]\n1***2", 3);
        checkResult("//[??]\n1??2??3", 6);
        checkResult("//[.,]\n1\n2.,3", 6);
    });

    //Support multiple custom delimiters
    describe('with multiple custom delimiters', () => {
        checkResult("//[;][,]\n1;2,3", 6);
        checkResult("//[;][,]\n1;2\n3,4", 10);
        checkResult("//[;][,]\n1;2,3;4", 10);
        checkResult("//[;][,]\n1\n2,3;4", 10);
    });

    //Support multiple custom delimiters with variable lengths
    describe('with multiple long custom delimiters', () => {
        checkResult("//[***][??]\n1***2??3", 6);
        checkResult("//[.,][;]\n1\n2.,3;4", 10);
        checkResult("//[.,][;]\n1,2;3,4", 10);
        checkResult("//[.,][;]\n1;2,3,4", 10);
    });

    //Helper function to DRY up test cases
    function checkResult(expression, expected) {
        it(`should evaluate "${expression}" to ${expected}`, () => {
            expect(calculator.add(expression)).toBe(expected);
        });
    }
});
