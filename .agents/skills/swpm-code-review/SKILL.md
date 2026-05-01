---
name: swpm-code-review
id: swpm-code-review
version: 1.0.0
tags: [swpm, code-review, standards, lint, quality]
description: Automated code review bash script for SWPM. Checks typing standards (type vs interface, no any), naming conventions, file structure, export patterns, and project constraints. Invoke via executable script.
disable-model-invocation: true
user-invocable: false
---

# SWPM Code Review

Use this skill to perform automated code reviews ensuring compliance with SWPM development standards. The skill provides an executable bash script that checks multiple aspects of the codebase.

## When to Use

- Developer requests "review my code" or "check my changes"
- Before submitting a pull request
- Verifying compliance with project standards
- **Do not use** for questions about standards (use `swpm-dev-standards` instead)

## What the Script Checks

The executable script `scripts/code-review.sh` validates:

1. **Typing Standards**
    - No `interface` keyword usage
    - No `any` type usage
    - Correct `import type` usage for type-only imports
    - Types in separate `*.types.ts` files

2. **Naming Conventions**
    - Files: kebab-case or lowercase
    - Functions: camelCase, arrow functions preferred
    - Constants: UPPER_SNAKE_CASE

3. **Export Patterns**
    - Default exports for configs/commands
    - Named exports for utilities
    - No anonymous function exports

4. **File Structure**
    - Tests in same directory as source
    - Type files in `*.types.ts`
    - Aliases in `src/alias/*.js`

5. **Project Constraints**
    - Node.js >= 20
    - ESM only (check package.json)
    - TypeScript strict mode
    - @yargs v18 API

6. **Lint and Tests**
    - Runs `npm run lint`
    - Runs `npm run ts:check`
    - Runs tests for changed test files

7. **Markdown Lint**
    - No trailing whitespace
    - No multiple consecutive blank lines
    - Correct date formats in CHANGELOG.md

## Usage

### Make it executable (required)

```bash
chmod +x .agents/skills/swpm-code-review/scripts/code-review.sh
```

### Run the review script

```bash
./agents/skills/swpm-code-review/scripts/code-review.sh
```

Or without execute permission:

```bash
bash .agents/skills/swpm-code-review/scripts/code-review.sh
```

### Review changes from master branch

Reviews only files changed compared to master branch:

```bash
bash .agents/skills/swpm-code-review/scripts/code-review.sh --master
```

### Review changes from main branch

```bash
bash .agents/skills/swpm-code-review/scripts/code-review.sh --main
```

### Review staged changes

```bash
bash .agents/skills/swpm-code-review/scripts/code-review.sh --staged
```

### Review specific files

```bash
bash .agents/skills/swpm-code-review/scripts/code-review.sh --files "src/helpers/cmds.ts src/helpers/args.ts"
```

## Example Output

```
=== SWPM Code Review ===

Checking changes vs master branch...
Files to review:
  - src/helpers/repos.ts
  - .agents/skills/swpm-release/scripts/release.sh

=== Running lint ===
...

=== Running type check ===
...

=== Checking typing standards ===
  WARNING: Found 'any' type in src/helpers/debug.ts
  WARNING: Found 'interface' in src/config.ts (use 'type' instead)

=== Checking naming conventions ===
  WARNING: Found PascalCase export in src/components/Button.ts (use camelCase)

=== Checking markdown files ===
  WARNING: Found trailing whitespace in README.md

=== Code Review Complete ===
```

## Script Location

```
.agents/skills/swpm-code-review/
├── SKILL.md
└── scripts/
    └── code-review.sh
```

## Example Questions

**Q**: "Can you review my changes?"
**A**: Run `bash .agents/skills/swpm-code-review/scripts/code-review.sh`

**Q**: "What does the code review check?"
**A**: Typing (no any, no interface), naming, exports, file structure, lint, tests, and project constraints.

**Q**: "How do I check specific files?"
**A**: Use `--files` flag: `bash .../code-review.sh --files "src/file1.ts src/file2.ts"`

## Observations

Before running the review:

- Ensure you're in the project root directory
- Review `swpm-dev-standards` skill for detailed standards
- Check `package.json` for current configuration
- Verify CHANGELOG.md follows Keep a Changelog format

## Configuration

The script uses:

- `package.json` - version, engines, type field
- `tsconfig.json` - TypeScript configuration
- npm scripts: `lint`, `ts:check`, `test`
