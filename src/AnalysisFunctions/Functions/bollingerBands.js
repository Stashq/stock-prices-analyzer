import boll from 'bollinger-bands'
import AnalyticalFunction from "../AnalysingFunction"

const bollingerBands = new AnalyticalFunction("bollinger bands", [
    {
        "name": "period",
        "min": 2
    },
    {
        "name": "times",
        "min": 0.1
    }
]);

bollingerBands.getTraces = function (input_x, input_y, func) {
    const y = boll(input_y, func.args.period, func.args.times);

    const lowerTrace = {
        funcName: func.name,
        x: input_x,
        y: y.lower,
        fill: null,
        name: `BB_low(${func.args.period}, ${func.args.times})`,
        type: "scatter",
        line: { "color": func.color },
      };

      const midTrace = {
          funcName: func.name,
          x: input_x,
          y: y.mid,
          fill: "tonexty",
          name: `BB_mid(${func.args.period}, -${func.args.times})`,
          type: "scatter",
          line: { "color": func.color },
        };

      const upperTrace = {
        funcName: func.name,
        x: input_x,
        y: y.upper,
        fill: "tonexty",
        name: `BB_high(${func.args.period}, ${func.args.times})`,
        type: "scatter",
        line: { "color": func.color },
      };

    return [lowerTrace, midTrace, upperTrace];
};

export default bollingerBands;

