import chalk from "chalk";

type Log = (message: string | number, type: "log" | "result" | "test") => void;

const _log: Log = (message, type = "log") => {
  switch (type) {
    case "result":
      console.log(`\n${chalk.bgBlue("RESULT:")} ${message}`);
      break;
    case "test":
      console.log(`${chalk.bgRed("TESTING: ")} ${message}`);
      break;
    case "log":
    default:
      console.log(chalk.bgMagenta(message));
      break;
  }
};

export const log = (message: string | number) => {
  _log(message, "log");
};

export const logResult = (message: string | number) => {
  _log(message, "result");
};

let shouldLog = true;

export const disableLog = () => { shouldLog = false; }
export const enableLog = () => { shouldLog = true; }

export const logTest = (testValue: unknown) => {
  if (!shouldLog) {
    return;
  }

  let message = testValue;

  if (typeof message === "object") {
    message = "\n" + JSON.stringify(testValue, null, 2);
  }

  _log(message as string | number, "test");
};