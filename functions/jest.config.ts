import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  rootDir: "./",
  testMatch: [
    "<rootDir>/src/test/**/*.test.ts",
    "<rootDir>/src/test/**/*.spec.ts",
  ],

  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default config;
