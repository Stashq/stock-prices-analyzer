import { ma } from "moving-averages";
import AnalyticalFunction from "../AnalysingFunction"

const movingAverage = new AnalyticalFunction("moving average", [
    {
        "name": "period",
        "min": 2
    }
]);

movingAverage.getTraces = function (input_x, input_y, func) {
    const y = ma(input_y, func.args.period);
    const trace = {
        funcName: func.name,
        type: "scatter",
        mode: "lines",
        name: `MA (${func.args.period})`,
        x: input_x,
        y: y,
        line: { "color": func.color },
    };
    return [trace];
};

export default movingAverage;
