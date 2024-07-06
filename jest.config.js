const config = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    setupFiles: ['./jest.setup.js'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    }
}

module.exports = config;