---
name: swpm-dev-guide
id: swpm-dev-guide
version: 1.0.0
tags: [swpm, development, debugging, local-env, testing, build]
description: Development guide for setting up, debugging, and testing SWPM locally. Includes project structure, build commands, testing, and common development tasks.
---

# SWPM Development Guide

Use this skill when developers need help with local development tasks, debugging, project structure understanding, or setting up their development environment for SWPM.

## When to Use

- Developer asks how to set up the development environment
- Questions about building, testing, or debugging SWPM
- Need to understand project structure or architecture
- Help with common development tasks (adding features, fixing bugs)
- **Do not use** for questions about using SWPM as an end-user

## Project Structure

```
swpm/
├── src/
│   ├── cli/swpm/          # CLI commands and entry points
│   │   ├── cli.ts         # Main CLI router (yargs v18)
│   │   └── commands/      # Individual command files
│   ├── packages/
│   │   ├── managers/      # Package manager configs (npm.ts, yarn.ts, etc.)
│   │   └── *.ts           # Package detection and utilities
│   └── alias/             # Direct CLI entry points (not via yargs)
├── bin/                   # Compiled output (deleted on prebuild)
├── .agents/skills/        # Agent skills for AI assistants
└── package.json           # ESM module, Node.js >= 20
```

## Build & Test Commands

### Build the project

```bash
npm run build
```

Deletes `bin/`, compiles TypeScript, copies assets, runs `npm ci` in bin/.

### Run tests

```bash
npm run test
```

Runs vitest with `--pool=forks` (required for ESM).

### Run single test

```bash
npx vitest run src/cli/swpm/commands/upgrade.test.ts --pool=forks
```

### Type checking

```bash
npm run ts:check
```

Type checking without emit.

## Development Tasks

### Starting development

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to compile
4. Use `npm link` (in bin/) to test globally

### Debugging a command

1. Check if command exists in `src/cli/swpm/commands/*.ts`
2. Verify manager config in `src/packages/managers/*.ts`
3. Check registration in `src/cli/swpm/cli.ts`
4. Add `console.log` or use Node.js inspector
5. Run with `node --inspect bin/swpm.js <command>`

### Adding a new feature

1. Follow architecture rules (two-layer command system)
2. Update manager configs if needed
3. Create command file if new command
4. Register in cli.ts if new command
5. Update documentation (CHEATSHEET.md, README.md)
6. Run tests and build to verify

## Key Constraints

- Node.js >= 20 (strict requirement)
- ESM only (`"type": "module"` in package.json)
- TypeScript strict mode enabled
- @yargs v18 API (not v17 or earlier)
- Output directory: `bin/` (gets deleted on prebuild)

## Example Questions

### Setup & Environment

**Q**: "How do I set up the development environment for SWPM?"
**Q**: "What are the requirements to develop SWPM locally?"
**Q**: "How do I build the project from source?"

### Debugging

**Q**: "How can I debug why the upgrade command is not working?"
**Q**: "The build is failing, how do I troubleshoot it?"
**Q**: "How do I test changes to the npm manager config?"

### Project Understanding

**Q**: "What is the two-layer command system?"
**Q**: "Where are package manager configurations defined?"
**Q**: "How does SWPM detect which package manager to use?"

### Testing

**Q**: "How do I run tests for a specific command?"
**Q**: "Why does vitest need --pool=forks?"
**Q**: "How do I add a new test for my feature?"

### Development Workflow

**Q**: "What steps should I follow to add a new command?"
**Q**: "How do I verify my changes don't break existing functionality?"
**Q**: "What documentation should I update when adding a feature?"

## Observations

Before answering, observe:

- Check current Node.js version with `node --version`
- Verify if `bin/` directory exists (build output)
- Review `AGENTS.md` for architecture rules
- Check `.agents/skills/swpm-manage-commands-args/` for command/args management
- Review `CHEATSHEET.md` for current implementation status
