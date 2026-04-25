# Developer Guide

Welcome to the SWPM development guide. This document explains how to set up your development environment and test changes locally.

## Table of Contents

- [Setup](#setup)
- [Using npm link](#using-npm-link)
- [Testing](#testing)
- [Building](#building)

## Setup

### Prerequisites

Before you can run tests or use the development version, you need to install the following package managers globally:

```bash
npm install -g yarn pnpm bun
```

Verify the installations:

```bash
yarn --version
pnpm --version
bun --version
```

These are required because SWPM tests validate functionality across multiple package managers (npm, yarn, pnpm, bun).

## Using npm link

### 1. Build the Project

First, compile the TypeScript code to JavaScript:

```bash
npm run build
```

This creates the compiled output in the `bin/` directory.

### 2. Create a Global Link

Navigate to the `bin/` folder and create a global symlink:

```bash
cd bin
npm link
```

This links the local development version globally, allowing you to use `swpm` and all its aliases (like `si`, `swpx`, etc.) as if it were installed from npm.

### 3. Test the Development Version

Now you can use any SWPM command:

```bash
swpm --version
swpm --help
si --help
swpx --help
```

Or in any project directory:

```bash
swpm install
swpm add lodash
```

### 4. Updating After Code Changes

After making code changes, you need to rebuild:

```bash
npm run build
cd bin
npm link
```

The symlink points to the compiled files in `bin/`, so rebuilding automatically updates the global version.

### 5. Unlinking (Optional)

To remove the global link and return to the npm-installed version:

```bash
npm unlink -g swpm
```

Or reinstall the official version:

```bash
npm install -g swpm
```

## Testing

### Running All Tests

```bash
npm run test
```

This runs all test files in the `src/` directory with verbose output.

### Running Tests in Watch Mode

Useful during development to automatically rerun tests when files change:

```bash
npm run test:w
```

### Running Tests with Coverage

Generate a coverage report:

```bash
npm run test:c
```

Coverage reports are saved in the `.vitest/` directory.

### Running Tests in Watch Mode with Coverage

```bash
npm run test:wc
```

### Running Tests with UI

For a visual test interface:

```bash
npm run test:ui
```

### Why Tests Need Multiple Package Managers

The test suite includes integration tests that verify SWPM works correctly with different package managers:

- **npm** - Always available
- **yarn** - Classic and Berry versions
- **pnpm** - Modern package manager
- **bun** - Fast JavaScript runtime

If any of these are not installed globally, their corresponding tests will skip or timeout. Install all of them to get complete test coverage.

## Building

### Compile TypeScript

```bash
npm run build
```

This runs:

1. `prebuild`: Cleans the `bin/` directory
2. `build`: Compiles TypeScript to JavaScript
3. `postbuild`: Copies necessary files (`package.json`, `README.md`, `LICENSE.md`, `CHANGELOG.md`) to `bin/`

### Create a Package

```bash
npm run pack
```

This creates a `.tgz` file that can be distributed or installed globally.

### Install Your Package Globally

```bash
npm install -g ./bin/swpm-2.6.0.tgz
```

(Adjust the version number if it differs.)

## Type Checking

Run TypeScript compiler without emitting files:

```bash
npm run ts:check
```

### Extended Diagnostics

For detailed TypeScript diagnostics:

```bash
npm run ts:diagnostics
```

### Trace Resolution

To debug module resolution:

```bash
npm run ts:trace
```

## Linting

Check for code style issues:

```bash
npm run lint
```

Fix issues automatically:

```bash
npm run lint:fix
```

## Notes

- This document is not included in npm distributions. It's for local development only.
- Always install all package managers (npm, yarn, pnpm, bun) before running tests.
- After pulling changes from the repository, run `npm install` to update dependencies.
- Use `npm run build` frequently during development to test your compiled output.
