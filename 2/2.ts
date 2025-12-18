import fs from "fs";
import path from "path";
import { log, logResult, logTest } from "../utils/log.ts";

log('Welcome to Day Two');

const rawData = fs.readFileSync(path.resolve(import.meta.dirname, "edgeCase.txt"), {
  encoding: "utf8",
});

const parse = (_data) => {
  const data = _data.split(",").map(x => { const [start, end] = x.split('-'); return { start, end } });
  return data;
};

const parsedData = parse(rawData);

type DataShape = { start: string; end: string }[]

const handle = (data: DataShape) => {
  const matchedPatterns = data.reduce((acc, { start, end }) => {
    // Odd length data, cant hold pattern
    if (start.length % 2 && end.length % 2) {
      return acc;
    }

    const startSegment = start.slice(0, Math.ceil(start.length / 2))
    const startSegmentNum = Number.parseInt(startSegment, 10)

    const endSegment = end.slice(0, Math.ceil(end.length / 2))
    const endSegmentNum = Number.parseInt(endSegment, 10)
    const endPattern = Number.parseInt(`${endSegment}${endSegment}`, 10);

    const startNum = Number.parseInt(start, 10)
    const endNum = Number.parseInt(end, 10)

    let patterns = {} as Record<string, boolean>;

    log(endSegmentNum);

    if (endSegmentNum <= endNum) {
      log('it matches')
    }

    for (let i = 0; i <= endSegmentNum - startSegmentNum; i += 1) {
      log(i);
      const validate = startSegmentNum + i;
      const startPattern = Number.parseInt(`${validate}${validate}`, 10)

      if (patterns[startPattern]) {
        continue;
      }

      if (startNum - startPattern <= 0 && endNum - startPattern >= 0) {
        patterns[startPattern] = true
      }

      logResult(startNum - endPattern);

      if (startPattern !== endPattern && startNum - endPattern <= 0 && endNum - endPattern >= 0) {
        patterns[endPattern] = true
      }
    }

    const patternNumbers = Object.keys(patterns).map(x => Number.parseInt(x, 10))

    logTest({ start, end, startPattern: `${startSegmentNum}${startSegmentNum}`, endPattern: endPattern, patterns })

    return [...acc, ...patternNumbers];
  }, [] as number[]);

  logTest(matchedPatterns);

  return matchedPatterns.reduce((acc, pattern) => BigInt(acc) + BigInt(pattern), BigInt(0))
}

const result = Number(handle(parsedData));

logResult(result);
