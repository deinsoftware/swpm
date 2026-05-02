# Naming Convention Examples

## File Naming

### ✅ Correct

```
src/helpers/cmds.types.ts
src/helpers/repos.types.ts
src/helpers/get.ts
src/helpers/info.ts
src/cli/swpm/commands/add.ts
src/packages/managers/npm.ts
```

### ❌ Incorrect

```
src/helpers/CmdsTypes.ts  // PascalCase
src/helpers/get_file.ts   // snake_case
src/helpers/Add.ts        // PascalCase
```

## Function Naming

### ✅ Correct - camelCase with arrow functions

```typescript
export const translateCommand = ({ yargs, cmdr }: TranslateCommandProp) => {
  // ...
}

export const fileExists = async (path: string) => {
  // ...
}
```

### Also acceptable - function declarations

```typescript
export function translateCommand(props: TranslateCommandProp) {
  // ...
}
```

### ❌ Incorrect

```typescript
export const TranslateCommand = () => {}  // PascalCase
export const file_exists = () => {}        // snake_case
```

## Variable and Constant Naming

### ✅ Correct

```typescript
const commandName = 'test'           // camelCase for variables
const MAX_RETRIES = 3               // UPPER_SNAKE_CASE for constants
const packageManagerConfig = {...}   // descriptive names
```

### ❌ Incorrect

```typescript
const pmc = {...}          // unclear abbreviation
const CommandName = 'test' // PascalCase
const max_retries = 3      // snake_case
```
