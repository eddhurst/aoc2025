import fs from "fs";
import path from "path";
import { disableLog, log, logTest } from "../utils/log.ts";

log('Welcome to Day Four');

const rawData = fs.readFileSync(path.resolve(import.meta.dirname, "input.txt"), {
  encoding: "utf8",
});

const PAPER = "@"
const REMOVED = 'x'

const lookAround = (currentState) => (x, y) => {
  let N = 0
  let NW = 0
  let W = 0
  let SW = 0
  let S = 0
  let SE = 0
  let E = 0
  let NE = 0

  disableLog();

  if (y === 0) {
    NE = 0; N = 0; NW = 0;
  } else {
    if (currentState[y - 1][x] === PAPER) { logTest('N'); N = 1 }
    if (currentState[y - 1][x + 1] === PAPER) { logTest('NW'); NW = 1 }
    if (currentState[y - 1][x - 1] === PAPER) { logTest('NE'); NE = 1 }
  }

  if (x === 0) {
    E = 0;
  } else {
    if (currentState[y][x - 1] === PAPER) { logTest('E'); E = 1 }
  }

  if (x === currentState.length - 1) {
    W = 0
  } else {
    if (currentState[y][x + 1] === PAPER) { logTest('W'); W = 1 }
  }

  if (y === currentState.length - 1) {
    SW = 0; S = 0; SE = 0;
  } else {
    if (currentState[y + 1][x + 1] === PAPER) { logTest('SW'); SW = 1 }
    if (currentState[y + 1][x] === PAPER) { logTest('S'); S = 1 }
    if (currentState[y + 1][x - 1] === PAPER) { logTest('SE'); SE = 1 }
  }

  if (
    N + NW + W + SW + S + SE + E + NE >= 4
  ) {
    return false;
  }

  return true;
}

const parse = (_data) => {
  const data = _data.split("\n")
  return data;
};

const data = parse(rawData)

const validate = (_data) => {
  let data = [..._data];
  let clone = [] as string[];
  let shouldRepeat = true;
  let totalRemoved = 0;

  while (shouldRepeat) {
    console.info(data);
    clone = [];
    const checkForPaper = lookAround(data);

    const loopRemoved = data.reduce((acc, row, y) => {
      let paper = 0;

      const cols = row.split('');

      let output = '';
      let count = 0;

      for (let x = 0; x <= row.length - 1; x += 1) {
        if (row[x] === '.') {
          output += '.'
          continue;
        }

        if (checkForPaper(x, y)) {
          output += '.'
          count += 1;
          continue;
        }

        output += PAPER;
      }

      clone.push(output);

      return acc + count;
    }, 0);

    log(`Removed: ${loopRemoved}`)

    data = [...clone]

    if (loopRemoved === 0) {
      shouldRepeat = false;
    } else {
      totalRemoved += loopRemoved;
    }
  }

  log(`Removed: ${totalRemoved}`)

}

console.info(validate(data));