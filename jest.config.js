module.exports = {
    "globals": {
      "ts-jest": {
        "babelConfig": false
      }
    },
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test))\\.(tsx?)$",
    "moduleFileExtensions": [
      "js",
      "jsx",
      "ts",
      "tsx",
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
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
    ]
}
