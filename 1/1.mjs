import fs from "fs";
import path from "path";

const rawData = fs.readFileSync(path.resolve(import.meta.dirname, "test.txt"), {
  encoding: "utf8",
});

const parse = (_data) => {
  const data = _data.replaceAll("\n", "");

  const result = data.matchAll(/(L|R)(\d+)/g);
  return result;
};

const processTurn = (_data) => {
  return _data.reduce(
    (acc, line) => {
      const [match, dir, _n] = line;
      let _num = parseInt(_n, 10);

      let _loc = acc.loc;
      let _clicksAtZero = acc.clicksAtZero;
      let _landsOnZero = acc.landsOnZero;

      for (let i = _num; i > 0; i -= 1) {
        switch (dir) {
          case "L":
            _loc -= 1;

            if (_loc === -1) {
              _loc = 99;
            }
            break;
          case "R":
            _loc += 1;

            if (_loc === 100) {
              _loc = 0;
            }
            break;
        }

        if (_loc === 0) {
          _clicksAtZero += 1;
        }
      }

      if (_loc === 0) {
        _landsOnZero += 1;
      }

      const spin = {
        loc: _loc,
        clicksAtZero: _clicksAtZero,
        landsOnZero: _landsOnZero,
      };
      console.info(spin);

      return spin;
    },
    { loc: 50, clicksAtZero: 0, landsOnZero: 0 },
  );
};

const data = parse(rawData);
const result = processTurn(data);
