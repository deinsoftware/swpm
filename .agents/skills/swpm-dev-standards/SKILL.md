`---
`name: swpm-dev-standards
`id: swpm-dev-standards
`version: 1.0.0
`tags: [swpm, standards, coding-style, typescript, eslint, conventions]
`description: Development standards and coding conventions for SWPM. Covers typing (use `type` not `interface`, no `any`), file structure, naming conventions, allowed patterns (ternaries without business logic), and export patterns.
`---
`
`# SWPM Development Standards
`
`Use this skill when questions arise about coding style, file organization, naming conventions, or what patterns are allowed/disallowed in the SWPM codebase.
`
`## When to Use
`
`- Developer asks "Where should I put this file?"
`- Questions about typing conventions (type vs interface, any usage)
`- Naming conventions for files, functions, or variables
`- Ternary usage rules
`- Test file location and naming
`- Export patterns (default vs named)
`- Try/catch patterns
`- Arrow function conventions
`- SOLID principles and Clean Code practices
`- **Do not use** for questions about adding commands or development setup
`
`## Quick Reference
`
`### File Structure
`
````
`src/
`├── cli/swpm/commands/     # CLI commands (add.ts, remove.ts)
`├── helpers/                # Utilities (cmds.ts, args.ts)
`├── packages/managers/      # Configs (npm.ts, yarn.ts, pnpm.ts)
`├── flags/                  # Flag definitions
`└── alias/                  # CLI aliases (.js files)
````
`
`### Typing Rules
`
`- ✅ Use `type` never `interface`
`- ❌ No `any` allowed
`- ✅ Use `import type` for type-only imports
`- ✅ Types in `*.types.ts` files
`
`### Naming Rules
`
`- Files: **kebab-case** (`cmds.types.ts`) or **lowercase** (`get.ts`)
`- Functions: **camelCase** arrow functions preferred
`- Constants: **UPPER_SNAKE_CASE**
`
`### Allowed Patterns
`
`- ✅ Ternaries only without business logic
`- ✅ Early returns over nested ifs
`- ✅ Named exports for utilities, default for configs/commands
`- ✅ Try/catch with `catch { }` or `catch (error)` only if used
`
`## Detailed Examples
`
`For detailed examples and code snippets, see the `examples/` folder:
`
`- **`examples/typing-examples.md`** - Type vs interface, no any, import type, types in separate files
`- **`examples/naming-examples.md`** - File naming, function naming, variable naming
`- **`examples/patterns-examples.md`** - Ternaries, early returns, exports, try/catch, arrow functions
`- **`examples/solid-clean-examples.md`** - SOLID principles, Clean Code, architecture patterns
`
`## Common Patterns in Codebase
`
`### Manager config structure
`
````typescript
`// src/packages/managers/npm.ts
`import type { PackageConfiguration } from '../packages.types.js'
`
`const npm: PackageConfiguration = {
`  cmd: 'npm',
`  exc: 'npx',
`  color: '#e32e37',
`  cmds: {
`    remove: 'uninstall',
`    upgrade: ['add', '--latest'],
`    interactive: ['', -1]
`  },
`  args: {
`    '--latest': ['<package>@latest', 1]
`  }
`}
`
`export default npm
````
`
`### Helper function pattern
`
````typescript
`// src/helpers/cmds.ts
`import type { TranslateCommandProp } from './cmds.types.js'
`
`export const translateCommand = ({ yargs, cmdr }: TranslateCommandProp) => {
`  if (!yargs?._?.length) {
`    return 'help'
`  }
`  return cmdr.config.cmds?.[yargs._[0]]
`}
````
`
`## Project Constraints
`
`- **Node.js >= 20** (strict requirement, volta: 20.9.0)
`- **ESM only** (`"type": "module"` in package.json)
`- **TypeScript strict mode** enabled
`- **@yargs v18 API** (currently using v17.7.2, needs upgrade)
`- **Output directory**: `bin/` (gets deleted on prebuild)
`- **No `any` type** anywhere in the codebase
`- **No `interface`** keyword anywhere in the codebase
`
`## ESLint & TypeScript Config
`
`- ESLint config: Check `eslint.config.js` or `.eslintrc`
`- TypeScript: `tsconfig.json` and `tsconfig.build.json`
`- Plugins: `@typescript-eslint/eslint-plugin`, `eslint-plugin-n`
`
`## Example Questions
`
`### File Organization
`
`**Q**: "Where should I put a new helper function for argument parsing?"
`**A**: In `src/helpers/` with a descriptive kebab-case name like `src/helpers/parse-args.ts`
`
`**Q**: "Where do test files go?"
`**A**: Same directory as the source file, named `[filename].test.ts`
`
`**Q**: "Should I create the type definitions in the same file?"
`**A**: No, create a separate `[module].types.ts` file in the same directory
`
`### Typing
`
`**Q**: "Can I use `any` here?"
`**A**: No, `any` is strictly forbidden. Define a proper type in a `.types.ts` file
`
`**Q**: "Should I use interface or type?"
`**A**: Always use `type`, never `interface`
`
`**Q**: "How should I import types?"
`**A**: Use `import type { TypeName } from './file.js'`
`
`### Code Style
`
`**Q**: "Can I use a ternary for this conditional?"
`**A**: Only if it's a simple assignment without business logic or function calls in the branches
`
`**Q**: "Should I use default or named exports?"
`**A**: Default for single-export configs/commands, named for utilities with multiple exports
`
`**Q**: "Do I need file extensions in imports?"
`**A**: Yes, use `.js` extension even for TypeScript files (`import { x } from './file.js'`)
`
`**Q**: "How should I handle errors with try/catch?"
`**A**: Use `catch { }` if you don't need the error, `catch (error)` only if you log it
`
`**Q**: "Should I use arrow functions or function declarations?"
`**A**: Prefer arrow functions `const fn = () => {}` for exports
`
`### SOLID and Clean Code
`
`**Q**: "Does the project follow SOLID principles?"
`**A**: Yes, see `examples/solid-clean-examples.md` for details
`
`**Q**: "What architecture patterns are used?"
`**A**: Configuration-driven, two-layer command system, functional programming (no classes)
`
`## Observations
`
`Before answering standards questions:
`
`- Check `tsconfig.json` for TypeScript configuration
`- Review `.eslintrc` or eslint config for linting rules
`- Look at existing files in the target directory for patterns
`- Verify if a `.types.ts` file already exists for the module
`- Check `package.json` for ESM and Node.js version requirements
`- Search for existing patterns: `grep -r "interface " src/` should return no results
`- Search for forbidden patterns: `grep -r ": any" src/` should return no results
`- Look at examples in `examples/` folder for detailed code snippets
