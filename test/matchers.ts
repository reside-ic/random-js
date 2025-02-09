import {
    getLabelPrinter,
    matcherHint,
    MatcherHintOptions,
    printExpected,
    printReceived,
} from "jest-matcher-utils";
import { expect } from "vitest";
import {approxEqual} from "./helpers";


expect.extend({
    toApproxEqual(received: any, expected: any, tolerance?: number) {
        const pass = approxEqual(received, expected, tolerance);

        const message = () => {
            const labelExpected = "Expected number";
            const labelReceived = "Received number";
            const printLabel = getLabelPrinter(labelExpected, labelReceived);
            const name = "toApproxEqual";
            const isNot = this.isNot;
            const options: MatcherHintOptions = {
                isNot,
                promise: this.promise,
                secondArgument: tolerance ? tolerance.toString() : "",
            };

            const hint = matcherHint(name, "number", "number", options) +
                "\n\n";
            return (
                hint +
                    printLabel(labelExpected) +
                    (isNot ? "not " : " ") +
                    printExpected(expected) +
                    "\n" +
                    printLabel(labelReceived) +
                    (isNot ? "    " : " ") +
                    printReceived(received)
            );
        };

        return {message, pass};
    },
});
