module.exports = {
    "globals": {
      "ts-jest": {
        "babelConfig": false
      }
    },
    "transform": {
      "^.+\\.ts$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test))\\.(tsx?)$",
    "moduleFileExtensions": [
      "js",
      "ts",
      "json"
    ],
    "verbose": true,
    "moduleDirectories": [
      "node_modules",
      "packages"
    ],
    "projects": [
      "<rootDir>/packages/*"
    ],
}
