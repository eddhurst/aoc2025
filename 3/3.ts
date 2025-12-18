import fs from "fs";
import path from "path";
import { log, logResult } from "../utils/log.ts";

log('Welcome to Day Three');

const rawData = fs.readFileSync(path.resolve(import.meta.dirname, "input.txt"), {
  encoding: "utf8",
});

const parse = (_data) => {
  const data = _data.split("\n").map((bank) => {
    const batteries = bank.split('');

    return {
      bank,
      batteries
    }
  });
  return data;
};

const data = parse(rawData)

// console.info(data);



// for each number
// get index of number
// split string at index
// sort remaining numbers, find highest
// return number

const handleBank = ({ bank }) => {
  let highestBattery = 0;
  let highestJoltage = 0;

  console.info(bank);

  for (let i = 0; i < bank.length; i += 1) {
    const battery = Number.parseInt(bank.charAt(i), 10);

    // console.info(battery);

    if (battery > highestBattery) {
      highestBattery = battery;

      const remainingBatteries = bank.slice(i + 1);
      const nextBiggest = remainingBatteries.split('').sort((a, b) => b - a)[0]

      const joltage = Number.parseInt(`${battery}${nextBiggest}`, 10);

      if (joltage > highestJoltage) {
        highestJoltage = joltage;
      }
    }
  }

  console.info(highestBattery, highestJoltage);

  return highestJoltage;
}


// start at index 0

// split remaining string at index
// sort DESC, remove duplicates (use Set). const uniqueAndSorted = (arr) => [...new Set(arr)].sort((a, b) => b - a);
// get index of first DESC number
// check it has enough numbers left

// if yes, repeat
// if no, check index of next DESC number

// find index of highest number in remaining string
// check it has enough length remaining
// 








const result = data.reduce((acc, bank) => {
  const highestJoltage = handleBank(bank);

  return acc + highestJoltage;
}, 0)

logResult(result);


// for each highest number
// get highest

// add