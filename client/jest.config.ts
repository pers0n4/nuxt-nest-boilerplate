import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js",
  },
  moduleFileExtensions: ["ts", "js", "vue", "json"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/components/**/*.vue",
    "<rootDir>/pages/**/*.vue",
  ],
  coverageDirectory: "../coverage/client",
  testEnvironment: "jsdom",
};

export default config;
