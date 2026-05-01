# Allowed Patterns Examples

## Ternaries

### ✅ Correct - Simple conditional assignment

```typescript
const color = isNpm ? '#e32e37' : '#000000'
const command = yargs._[0] ?? 'help'
const action = cmdr?.config?.cmds?.[key]
```

### ❌ Incorrect - Business logic in ternary

```typescript
const result = condition
  ? complexCalculationA() + processData()
  : complexCalculationB() - validateInput()

const value = x > 0
  ? getData() && transformData()
  : defaultValue
```

### ✅ Correct - Use if/else for complex logic

```typescript
if (condition) {
  return complexCalculationA()
} else {
  return complexCalculationB()
}
```

## Early Returns

### ✅ Correct - Early return pattern

```typescript
export const fileExists = async (path: string) => {
  try {
    await fs.stat(path)
    return true
  } catch {
    return false
  }
}

export const translateCommand = ({ yargs, cmdr }: TranslateCommandProp) => {
  if (!yargs?._?.length) {
    return 'help'
  }
  return cmdr.config.cmds?.[yargs._[0]]
}
```

### ❌ Incorrect - Nested ifs

```typescript
export const fileExists = async (path: string) => {
  try {
    await fs.stat(path)
    if (condition) {
      if (anotherCondition) {
        return true
      }
    }
    return false
  } catch {
    return false
  }
}
```

## Export Patterns

### ✅ Correct - Default for configs

```typescript
// src/packages/managers/npm.ts
const npm: PackageConfiguration = {
  cmd: 'npm',
  // ...
}
export default npm

// src/cli/swpm/commands/add.ts
const add: CommandModule = {
  command: 'add <package>',
  // ...
}
export default add
```

### ✅ Correct - Named for utilities

```typescript
// src/helpers/cmds.ts
export const translateCommand = ({ yargs, cmdr }: TranslateCommandProp) => {
  // ...
}

export const addArgs = ({ yargs, cmdr, flags }: AddArgs) => {
  // ...
}
```

## Try/Catch Patterns

### ✅ Correct - Don't use error parameter if not needed

```typescript
export const fileExists = async (path: string) => {
  try {
    await fs.stat(path)
    return true
  } catch {
    return false
  }
}
```

### ✅ Correct - Use error parameter if you need it

```typescript
export const getPackageJson = async () => {
  try {
    const pkg = await fs.readFile(path, 'utf-8')
    return JSON.parse(pkg)
  } catch (error) {
    console.error('Failed to read package.json', error)
    return undefined
  }
}
```

### ❌ Incorrect - Empty catch block

```typescript
try {
  // ...
} catch {} // missing error handling or explicit "catch {}"
```

## Arrow Function Conventions

### ✅ Correct - Explicit return for multi-line

```typescript
export const translateCommand = ({ yargs, cmdr }: TranslateCommandProp) => {
  return cmdr.config.cmds?.[key]
}
```

### ✅ Correct - Implicit return for single expression

```typescript
export const getCommand = (key: string) => cmdr.config.cmds?.[key]
```

### ❌ Incorrect - Inconsistent style

```typescript
export const translateCommand = function(props: TranslateCommandProp) {
  return cmdr.config.cmds?.[key]
}
```
