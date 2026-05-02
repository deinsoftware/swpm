# SOLID and Clean Code Examples

## SOLID Principles in SWPM

### SRP (Single Responsibility Principle)

Each file has a single responsibility:

```typescript
// ✅ cmds.ts - Only handles command translation
export const translateCommand = () => { ... }
export const addArgs = () => { ... }

// ✅ args.ts - Only handles argument translation
export const translateArgs = () => { ... }
export const replaceFlag = () => { ... }

// ✅ npm.ts - Only defines npm configuration
const npm: PackageConfiguration = { ... }
export default npm
```

### OCP (Open/Closed Principle)

Adding new package managers without changing core logic:

```typescript
// ✅ Core logic in cmds.ts doesn't change
export const translateCommand = ({ yargs, cmdr }: TranslateCommandProp) => {
  // Generic translation logic
}

// ✅ Just add new config file
// src/packages/managers/bun.ts
const bun: PackageConfiguration = { ... }
export default bun
```

### LSP (Liskov Substitution Principle)

All managers follow the same type:

```typescript
// ✅ All configs implement PackageConfiguration
// src/packages/managers/npm.ts
const npm: PackageConfiguration = { ... }

// src/packages/managers/yarn.ts
const yarn: PackageConfiguration = { ... }

// src/packages/managers/pnpm.ts
const pnpm: PackageConfiguration = { ... }
```

### ISP (Interface Segregation Principle)

Separate type files for different concerns:

```typescript
// ✅ cmds.types.ts - Only command-related types
export type AddArgs = { ... }
export type TranslateCommandProp = { ... }

// ✅ args.types.ts - Only argument-related types
export type ReplaceFlagProps = { ... }
export type TranslateArgsProp = { ... }
```

### DIP (Dependency Inversion Principle)

Functions depend on abstractions (types), not concretions:

```typescript
// ✅ Depends on type, not concrete implementation
export const translateCommand = ({ yargs, cmdr }: TranslateCommandProp) => {
  // cmdr is CommanderPackage type, not specific to npm or yarn
}
```

## Clean Code Principles

### Small, Focused Functions

```typescript
// ✅ Small and focused
export const fileExists = async (path: string) => {
  try {
    await fs.stat(path)
    return true
  } catch {
    return false
  }
}

// ✅ Single purpose
export const replaceCommand = ({ args, cmd, action }: ReplaceCommandProps) => {
  const index = args?.findIndex((arg) => arg === cmd)
  args[index] = action
}
```

### Descriptive Names

```typescript
// ✅ Descriptive
const packageManagerConfig = getConfig()
const commandTranslator = translateCommand(...)

// ❌ Unclear abbreviations
const pmc = getConfig()
const ct = translateCommand(...)
```

### Early Returns (Avoid Nested Ifs)

```typescript
// ✅ Early return
export const translateCommand = ({ yargs, cmdr }: TranslateCommandProp) => {
  if (!yargs?._?.length) {
    return 'help'
  }

  const key = yargs._[0]
  const action = cmdr?.config?.cmds?.[key]

  if (!action) {
    return yargs._[0]
  }

  // ... more logic
}
```

## Architecture Patterns

### Configuration-Driven

Behavior defined in config objects, not inheritance:

```typescript
// ✅ Configuration defines behavior
const npm: PackageConfiguration = {
  cmds: {
    remove: 'uninstall',
    upgrade: ['install', '--latest']
  },
  args: {
    '--latest': ['<package>@latest', 1]
  }
}
```

### Two-Layer Command System

1. Config layer: `src/packages/managers/*.ts`
2. CLI layer: `src/cli/swpm/commands/*.ts`
3. Registration: `src/cli/swpm/cli.ts`

### Functional Programming

No classes, functions as first-class citizens:

```typescript
// ✅ No classes in the codebase
// ✅ Functions are exported directly
export const translateCommand = () => { ... }
export const addArgs = () => { ... }
```
