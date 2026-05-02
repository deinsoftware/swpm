# Typing Examples

## Type vs Interface

### ✅ Correct - Use `type`

```typescript
export type PackageConfig = {
  cmd: string
  args: string[]
}

export type AddArgs = {
  yargs: ArgumentsCamelCase
  cmdr: CommanderPackage
  flags: (string|number)[]
}
```

### ❌ Incorrect - Never use `interface`

```typescript
export interface PackageConfig {
  cmd: string
  args: string[]
}
```

## No `any` allowed

### ✅ Correct - Specific types

```typescript
export type GetCommandResultProps = {
  command: string
  volta?: boolean
}

const data: string[] = getData()
const result: PackageManagerList = []
```

### ❌ Incorrect - `any` is forbidden

```typescript
const data: any = getData()
const result: any[] = []
```

## Import type pattern

### ✅ Correct - Use `import type`

```typescript
import type { CommandModule } from 'yargs'
import type { PackageManagerList } from '../packages/packages.types.js'
import type { ArgumentsCamelCase } from 'yargs'
```

### ❌ Incorrect

```typescript
import { CommandModule } from 'yargs' // missing 'type' keyword
```

## Types in separate files

### ✅ Correct - `src/helpers/cmds.types.ts`

```typescript
import type { CommanderPackage } from '../translator/commander.types.js'
import type { ArgumentsCamelCase } from 'yargs'

export type AddArgs = {
  yargs: ArgumentsCamelCase
  cmdr: CommanderPackage
  flags: (string|number)[]
}

export type ReplaceCommandProps = {
  args: CommanderPackage['args']
  cmd: string | number
  action: string
}
```
