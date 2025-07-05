var calculator = {

    /**
     * Main method to add numbers from a formatted string.
     * Handles custom delimiters, validation, and sum calculation.
     */
    add: function (expression) {

        // Return 0 for empty or whitespace input
        if (expression === "" || expression === " ") {
            return 0;
        }

        // Extract custom delimiter if present (e.g., "//;\n1;2")
        if (expression.startsWith("//")) {
            expression = this.getDelimiter(expression);
        }

        // Check and throw error for negative numbers
        var negatives = expression.match(/-([0-9]+)/g);
        if (negatives) {
            throw new Error("negatives not allowed: " + negatives.join(", "));
        }

        // Split expression by default delimiters (comma or newline)
        var tokens = expression.split(/[\n,]/);

        // Compute and return the sum
        return this.calculateSum(tokens);
    },

    /**
     * Escapes special regex characters in a string (for custom delimiters).
     */
    escapeRegExp: function (str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    /**
     * Extracts and normalizes custom delimiters from the expression.
     * Converts all custom delimiters to comma for consistent splitting.
     */
    getDelimiter: function (expression) {
        var delimiterEndIndex = expression.indexOf("\n");
        var delimiterSection = expression.substring(2, delimiterEndIndex);

        var delimiters = [];

        // Support for multiple or multi-length delimiters
        if (delimiterSection.startsWith("[")) {
            for (var i = 0; i < delimiterSection.length;) {
                if (delimiterSection[i] === '[') {
                    var endIndex = delimiterSection.indexOf(']', i);
                    if (endIndex !== -1) {
                        delimiters.push(delimiterSection.substring(i + 1, endIndex));
                        i = endIndex + 1;
                    }
                } else if (delimiterSection[i] === ']') {
                    continue;
                }
            }
        } else {
            // Handle single character custom delimiter
            delimiters.push(delimiterSection);
        }

        // Remove delimiter definition from expression
        expression = expression.substring(delimiterEndIndex + 1);

        // Replace each custom delimiter with comma
        for (var i = 0; i < delimiters.length; i++) {
            var escaped = this.escapeRegExp(delimiters[i]);
            expression = expression.replace(new RegExp(escaped, 'g'), ',');
        }

        return expression;
    },

    /**
    * Sums the numeric values in a token list, ignoring values > 1000.
    */
    calculateSum: function (tokens) {
        var sum = 0;
        for (var i = 0; i < tokens.length; i++) {
            var number = parseInt(tokens[i] || 0);

            // Ignore NaN and numbers > 1000
            if (!isNaN(number) && number <= 1000) {
                sum += number;
            }
        }
        return sum;
    }
};

export default calculator;