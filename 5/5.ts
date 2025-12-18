import fs from "fs";
import path from "path";
import { log } from "../utils/log.ts";

log('Welcome to Day Five');

const rawData = fs.readFileSync(path.resolve(import.meta.dirname, "test.txt"), {
  encoding: "utf8",
});

const parse = (_data) => {
  const data = _data.split("\n")

  return data.reduce((acc, row) => {
    if (row === '') {
      return acc;
    }

    if (row.indexOf('-') >= 0) {
      const [_start, _finish] = row.split('-');

      const start = Number.parseInt(_start, 10)
      const finish = Number.parseInt(_finish, 10)

      return {
        ranges: [...acc.ranges, { start, finish, contains: finish - start + 1 }],
        ingredients: acc.ingredients
      }
    }

    return {
      ranges: acc.ranges,
      ingredients: [...acc.ingredients, Number.parseInt(row, 10)]
    }

  }, { ranges: [], ingredients: [] })
};

const { ranges, ingredients } = parse(rawData)

const checkFreshness = (ingredients) => {
  return ingredients.reduce((acc, ingredient) => {

    // logTest(ingredient);

    const isFresh = ranges.some(({ start, finish }) => {
      // console.info(start, finish)

      if (ingredient >= start && ingredient <= finish) {
        return true;
      }
      return false;
    })

    if (isFresh) {
      console.info(`${ingredient} is fresh`)
    }

    return acc + isFresh
  }, 0)
}

console.info(ranges);