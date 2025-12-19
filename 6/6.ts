import fs from "fs";
import path from "path";
import { log, logResult } from "../utils/log.ts";

log('Welcome to Day Six');

const rawData = fs.readFileSync(path.resolve(import.meta.dirname, "test.txt"), {
  encoding: "utf8",
});

const parse = (_data) => {
  const data = _data.split("\n")

  const operands = data[data.length - 1];
  const numberSplit = [...operands.matchAll(/\+|\*/g)].reduce(
    (acc, match) => ([...acc, { operand: match[0], index: match.index }]), []
  )

  const numbers = data.slice(0, data.length - 1).map((row) => {
    return row
  })

  return {
    numbers, operands: numberSplit
  }
};

const homework = parse(rawData);

/** Broken for pt 2
const doHomework = ({ operands, numbers: cols }) => {
  return operands.reduce((acc, { operand }, i) => {
    switch (operand) {
      case '+':
        acc += cols[i].reduce((acc, num) => acc + num, 0);
        break;
      case '*':
        acc += cols[i].reduce((acc, num) => acc * num, 1); // mul by 1 to start
    }

    return acc;
  }, 0);
}
*/

const doActualHomework = ({ numbers, operands }) => {
  let maxLength = numbers[0].length;

  let columns = [] as number[];
  let finalHomework = [] as number[][];
  for (let x = 0; x <= maxLength; x += 1) {
    let colNumber = ''

    for (let col in numbers) {
      if (numbers[col] !== ' ') {
        colNumber += numbers[col][x] || ''
      }
    }

    if (colNumber.trim().length === 0) {
      finalHomework.push(columns);
      columns = []
    } else {
      columns.push(Number.parseInt(colNumber.trim(), 10))
    }
  }

  return operands.reduce((acc, { operand }, y) => {
    switch (operand) {
      case '+':
        acc += finalHomework[y].reduce((acc, num) => acc + num, 0);
        break;
      case '*':
        acc += finalHomework[y].reduce((acc, num) => acc * num, 1); // mul by 1 to start
    }

    return acc;
  }, 0);
}

const result = doActualHomework(homework);

logResult(result);