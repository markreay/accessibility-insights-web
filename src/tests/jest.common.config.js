// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
module.exports = {
    clearMocks: true,
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        /* Using proxy to handle css modules, as per: https://jestjs.io/docs/en/webpack#mocking-css-modules */
        '\\.(scss)$': 'identity-obj-proxy',
    },
    // This ensures that failures in beforeAll/beforeEach result in dependent tests not trying to run.
    // See https://github.com/facebook/jest/issues/2713
    testRunner: 'jest-circus/runner',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    verbose: false,
};
