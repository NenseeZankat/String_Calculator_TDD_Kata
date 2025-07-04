var calculator = {
    add: function(expression) {

        // If the expression is empty, return 0
        if (expression === "" || expression === " ") {
            return 0;
        }

        // If the expression starts with a custom delimiter, extract it
        if (expression.startsWith("//")) {
            var delimiterEndIndex = expression.indexOf("\n");
            var delimiter = expression.substring(2, delimiterEndIndex);
            expression = expression.substring(delimiterEndIndex + 1);
            // Replace the custom delimiter with a comma for easier processing
            expression = expression.replace(new RegExp(delimiter, 'g'), ',');
            console.log(expression);
        }        

        //Calling Add with a negative number will throw an exception “negatives not allowed” - and the negative that was passed. 
        // if there are multiple negatives, show all of them in the exception message.
        var negatives = expression.match(/-([0-9]+)/g);
        if (negatives) {
            throw new Error("negatives not allowed: " + negatives.join(", "));
        }

        var tokens = expression.split(/[\n,]/);
        var sum = 0;
        for (var i = 0; i < tokens.length; i++) {
            var number = parseInt(tokens[i] || 0);

            //Numbers bigger than 1000 should be ignored, so adding 2 + 1001 = 2
            if (!isNaN(number) && number <= 1000) {
                sum += number;
            }
        }
        return parseInt(sum || 0);
    }
};

export default calculator;