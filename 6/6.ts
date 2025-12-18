import fs from "fs";
import path from "path";
import { log } from "../utils/log.ts";

log('Welcome to Day Six');

const rawData = fs.readFileSync(path.resolve(import.meta.dirname, "test.txt"), {
  encoding: "utf8",
});

const parse = (_data) => {
  const data = _data.split("\n")

  const numbers = data.slice(0, data.length - 1).map((row) => {
    return row
  })

  const operands = data[data.length - 1].trim().split(/\s+/g);

  return {
    numbers, operands
  }
};

const homework = parse(rawData);

console.info(homework);

const doHomework = ({ operands, cols }) => {
  return operands.reduce((acc, operator, i) => {
    switch (operator) {
      case '+':
        acc += cols[i].reduce((acc, num) => acc + num, 0);
        break;
      case '*':
        acc += cols[i].reduce((acc, num) => acc * num, 1); // mul by 1 to start
    }

    return acc;
  }, 0);
}

// const result = doHomework(homework)

// logResult(result);