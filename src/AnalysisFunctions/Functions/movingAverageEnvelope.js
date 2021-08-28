import { ma } from "moving-averages";
import AnalyticalFunction from "../AnalysingFunction"

const movingAverage = new AnalyticalFunction("moving average envelope", [
    {
        "name": "period",
        "min": 2
    },
    {
        "name": "precent",
        "min": 0
    }
]);

movingAverage.getTraces = function (input_x, input_y, func) {
    const y = ma(input_y, func.args.period);

    const lowerTrace = {
        funcName: func.name,
        x: input_x,
        y: y.map((item) => item * (1 - 0.01 * func.args.precent)),
        fill: null,
        name: `MA_low(${func.args.period}, ${func.args.precent})`,
        type: "scatter",
        line: { "color": func.color },
      };

      const upperTrace = {
        funcName: func.name,
        x: input_x,
        y: y.map((item) => item * (1 + 0.01 * func.args.precent)),
        fill: "tonexty",
        name: `MA_high(${func.args.period}, ${func.args.precent})`,
        type: "scatter",
        line: { "color": func.color },
      };

    return [lowerTrace, upperTrace];
};

export default movingAverage;
