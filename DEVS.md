# Developer Guide

Welcome to the SWPM development guide. This document explains how to set up your development environment and test changes locally, specifically for the **v3.0.0** update.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development & Testing](#local-development--testing)
- [Testing](#testing)
- [Building](#building)
- [Type Checking & Linting](#type-checking--linting)

---

## Prerequisites

### Node.js

Starting with **v3.0.0**, this project requires **Node.js >= 18.12.0**.

### Package Managers

To run the full test suite and validate functionality across multiple environments, you need to install the following package managers globally:

```bash
npm install -g yarn pnpm bun deno
```

Verify the installations:

```bash
yarn --version
pnpm --version
bun --version
deno --version
```

These are required because SWPM tests validate functionality across multiple package managers (npm, yarn, pnpm, bun).

---

## Local Development & Testing

Please follow these steps:

### 1. Environment Setup

Switch to the development branch and sync dependencies:

```bash
git fetch origin
git checkout <branch>
npm ci
```

### 2. Uninstall Stable Version

To avoid conflicts with the official version, remove the current global installation:

```bash
npm uninstall -g swpm
```

### 3. Build and Link

From the project root, build the project and create a global symlink:

```bash
npm run build
cd bin
npm link
```

The `swpm` command (and its aliases like `si`, `swpx`, etc.) will now be available globally, pointing to your local development code. You can verify the version with:

```bash
swpm --version
```

### 4. Reverting Changes

Once you are finished testing, you can revert to the stable version by running this inside the `bin` folder:

```bash
npm unlink
npm install -g swpm
```

---

## Testing

### Running All Tests

```bash
npm run test
```

This runs all test files in the `src/` directory with verbose output.

### Advanced Testing Commands

- **Watch Mode:** `npm run test:w` (auto-rerun on changes)
- **Coverage:** `npm run test:c` (reports saved in `.vitest/`)
- **Watch + Coverage:** `npm run test:wc`
- **UI Mode:** `npm run test:ui` (visual test interface)

> **Note:** The test suite includes integration tests for **npm**, **yarn**, **pnpm**, and **bun**. If any of these are not installed globally, their corresponding tests will skip or timeout.

---

## Building

### Compile TypeScript

```bash
npm run build
```

This command triggers:

1. `prebuild`: Cleans the `bin/` directory.
2. `build`: Compiles TypeScript source files into JavaScript.
3. `postbuild`: Copies necessary metadata files (`package.json`, `README.md`, `LICENSE.md`, `CHANGELOG.md`) to the `bin/` folder.

### Create a Package

To create a `.tgz` file for distribution:

```bash
npm run pack
```

### Install Your Package Locally

```bash
npm install -g ./bin/swpm-3.0.0.tgz
```

---

## Type Checking & Linting

### TypeScript Diagnostics

```bash
npm run ts:check      # Run compiler without emitting files
npm run ts:diagnostics # Get detailed TS diagnostics
npm run ts:trace       # To debug module resolution
```

### Linting

```bash
npm run lint          # Check for code style issues
npm run lint:fix      # Automatically fix linting issues
```

---

## Notes

- This document is not included in npm distributions. It's for local development only.
- Always run `npm install` (or `npm ci`) after pulling changes from the repository.
- Since `npm link` points to the `bin/` directory, you must run `npm run build` whenever you modify the source code to see those changes reflected in the global command.
