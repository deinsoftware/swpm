# AGENTS.md - SWPM Project Guidance

## Skills

Skills are available in `.agents/skills/` directory following Agent Skills specification. Each skill is self-contained with instructions, examples, and constraints.

Available skills:

- **`swpm-manage-commands-args`**: Manages `cmds` and `args` props in package manager configs (`src/packages/managers/*.ts`). Handles adding, modifying, or removing command/argument mappings across npm, yarn, pnpm, bun, deno. Includes internal templates and real-world examples. Location: `.agents/skills/swpm-manage-commands-args/`
- **`swpm-dev-guide`**: Development guide for setting up, debugging, and testing SWPM locally. Answers questions about project structure, build commands, testing, and common development tasks. Location: `.agents/skills/swpm-dev-guide/`
- **`swpm-dev-standards`**: Development standards and coding conventions for SWPM. Covers typing (use `type` not `interface`, no `any`), file structure, naming conventions, allowed patterns (ternaries without business logic), and export patterns. Location: `.agents/skills/swpm-dev-standards/`
- **`swpm-semver`**: Semantic Versioning 2.0.0 guidelines for SWPM. Defines when to increment major/minor/patch versions and pre-release conventions. Location: `.agents/skills/swpm-semver/`
- **`swpm-conventional-commits`**: Conventional Commits 1.0.0 specification for SWPM. Defines commit message format with types (feat, fix, etc.), scopes, breaking changes, and body/footer conventions. Location: `.agents/skills/swpm-conventional-commits/`
- **`swpm-keepachangelog`**: Keep a Changelog 1.1.0 standards for SWPM. Defines format, sections, and conventions for CHANGELOG.md entries. Location: `.agents/skills/swpm-keepachangelog/`

Available commands:

- **`/swpm-release`**: Automated release script for SWPM. Updates version in package.json, moves `[Unreleased]` entries to new version section in CHANGELOG.md. Location: `.agents/skills/swpm-release/`
- **`/swpm-code-review`**: Automated code review for SWPM. Checks typing standards, naming conventions, export patterns, and project constraints. Location: `.agents/skills/swpm-code-review/`

## Build & Test Commands

- `npm run build` - Deletes `bin/`, compiles TypeScript, copies assets, runs `npm ci` in bin/
- `npm run test` - Runs vitest with `--pool=forks` (required for ESM)
- `npm run ts:check` - Type checking without emit
- Single test: `npx vitest run src/cli/swpm/commands/upgrade.test.ts --pool=forks`

## Architecture Rules

- **Two-layer command system**: `src/packages/managers/*.ts` defines command mappings, but commands ONLY work if:
  1. A corresponding file exists in `src/cli/swpm/commands/*.ts`
  2. The command is registered in `src/cli/swpm/cli.ts`
- **Adding a new command requires all three**: manager config entry + command file + cli.ts registration
- **Translation only for DIFFERENT commands**: If a command is the same across package managers, it's NOT included in config files (e.g., `test`, `build` are identical, so no mapping needed)
- **NOT restrictive**: If SWPM doesn't have a command/argument in config, it passes through as-is to the detected package manager. Users can run any command, SWPM just translates what it knows
- **Aliases**: Implemented in `src/alias/*.js` as direct CLI entry points (not via yargs)

## Package Manager Config Files

- Location: `src/packages/managers/*.ts` (npm.ts, yarn.ts, pnpm.ts, bun.ts, deno.ts)
- Commands without corresponding CLI files will NOT work (learned the hard way with `why`, `ci`, `info`)
- Args mapping: `['', -1]` means unsupported; actual value means supported
- Supported: npm, yarn (classic), yarn@berry, pnpm, bun, deno (v2.0+)

## Key Constraints

- Node.js >= 20 (strict requirement)
- ESM only (`"type": "module"` in package.json)
- TypeScript strict mode enabled
- Output directory: `bin/` (gets deleted on prebuild)
- @yargs v18 API (not v17 or earlier)

## Documentation Sync

- **`CHEATSHEET.md`**: Tracks implementation status with `[x]`/`[ ]` markers. Update when adding/removing command support
- **`README.md`**: Documents commands and warnings. Update when support changes (e.g., remove "not available" warnings)

## CI Workflow

- Build job: `npm ci --ignore-scripts` → `npm run build` → `npm link` (in bin/) → `npm run test:c`
- Node version: 20 (env.NODE_VERSION in build.yml)
