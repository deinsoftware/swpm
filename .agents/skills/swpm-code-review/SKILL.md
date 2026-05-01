---
name: swpm-code-review
id: swpm-code-review
version: 1.0.0
tags: [swpm, code-review, standards, lint, quality]
description: Automated code review script for SWPM. Checks typing standards (type vs interface, no any), naming conventions, file structure, export patterns, and project constraints. Invoke via executable script.
disable-model-invocation: true
user-invocable: true
---

# SWPM Code Review

Use this skill to perform automated code reviews ensuring compliance with SWPM development standards. The skill provides an executable script that checks multiple aspects of the codebase.

## When to Use

- Developer requests "review my code" or "check my changes"
- Before submitting a pull request
- Verifying compliance with project standards
- **Do not use** for questions about standards (use `swpm-dev-standards` instead)

## What the Script Checks

The executable script `scripts/code-review.js` validates:

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

6. **Markdown Lint**
   - No escaped backticks
   - Proper code block syntax
   - Correct date formats in CHANGELOG.md

## Usage

### Make it executable (required)

```bash
chmod +x .agents/skills/swpm-code-review/scripts/code-review.js
```

### Run the review script

```bash
./agents/skills/swpm-code-review/scripts/code-review.js
```

Or without execute permission:

```bash
node .agents/skills/swpm-code-review/scripts/code-review.js
```

### Review specific files

```bash
node .agents/skills/swpm-code-review/scripts/code-review.js src/helpers/cmds.ts src/helpers/args.ts
```

### Review changes from master (production)

Reviews only files changed compared to master branch:

```bash
node .agents/skills/swpm-code-review/scripts/code-review.js --master
```

### Review staged changes

```bash
node .agents/skills/swpm-code-review/scripts/code-review.js --staged
```

### Review specific files

```bash
node .agents/skills/swpm-code-review/scripts/code-review.js src/helpers/cmds.ts src/helpers/args.ts
```

### Review staged changes

```bash
node .agents/skills/swpm-code-review/scripts/code-review.js --staged
```

## Example Output

```
SWPM Code Review
================

Checking typing standards...
✅ No 'interface' usage found
❌ Found 'any' type in src/helpers/debug.ts:15
   - const data: any = getData()

Checking naming conventions...
✅ All files follow kebab-case/lowercase
✅ Functions use camelCase

Checking export patterns...
✅ Default exports for configs
✅ Named exports for utilities

Checking project constraints...
✅ Node.js version: 20.9.0
✅ ESM enabled
✅ TypeScript strict mode
❌ @yargs version: 17.7.2 (expected: v18+)

Checking CHANGELOG.md...
❌ Date format error in line 374: '2023/12/14' should be '2023-12-14'

================
Review Complete: 2 errors, 0 warnings
```

## Script Location

```
.agents/skills/swpm-code-review/
├── SKILL.md
└── scripts/
    └── code-review.js
```

## Example Questions

**Q**: "Can you review my changes?"
**A**: Run `node .agents/skills/swpm-code-review/scripts/code-review.js`

**Q**: "What does the code review check?"
**A**: Typing (no any, no interface), naming, exports, file structure, and project constraints.

**Q**: "How do I check specific files?"
**A**: Pass file paths as arguments: `node .../code-review.js src/file1.ts src/file2.ts`

## Observations

Before running the review:

- Ensure you're in the project root directory
- Review `swpm-dev-standards` skill for detailed standards
- Check `package.json` for current configuration
- Verify CHANGELOG.md follows Keep a Changelog format

## Configuration

The script reads configuration from:

- `package.json` - version, engines, type field
- `tsconfig.json` - TypeScript configuration
- `.eslintrc` or eslint config - linting rules
