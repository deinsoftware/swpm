# Commands Templates

## Replace

Replace a command (or alias) with another command available in the package manager.

**When to use**: When the command name differs between package managers but performs the same function.

**Template**:

```typescript
cmds: {
  command: 'to',
  alias: 'to',
}
```

### Real example 1: npm remove → uninstall

```typescript
// In npm.ts
cmds: {
  remove: 'uninstall',
  r: 'uninstall',
}
```

**Result**: `swpm remove express` → `npm uninstall express`

### Real example 2: yarn add → add (no change needed)

```typescript
// In yarn.ts
// No mapping needed, command is same across all managers
```

---

## Replace and add a Flag

Replace a command (or alias) with another and add a flag at the end.

**When to use**: When the target command needs additional flags to match the behavior of the original command.

**Template**:

```typescript
cmds: {
  command: ['to', '--flag'],
  alias: ['to', '--flag'],
}
```

### Real example 1: npm upgrade → install --latest

```typescript
// In npm.ts
cmds: {
  upgrade: ['install', '--latest'],
  ug: ['install', '--latest'],
}
```

**Result**: `swpm upgrade express` → `npm install express --latest`

### Real example 2: yarn upgrade → upgrade --latest

```typescript
// In yarn.ts
cmds: {
  upgrade: ['upgrade', '--latest'],
}
```

---

## Not Available

Command (or alias) not available on the package manager.

**When to use**: When a package manager doesn't have an equivalent command.

**Template**:

```typescript
cmds: {
  command: ['', -1],
}
```

### Real example 1: npm why → not available

```typescript
// In npm.ts
cmds: {
  why: ['', -1],
}
```

**Result**: `swpm why express` → Not executed in npm

### Real example 2: bun ci → not available

```typescript
// In bun.ts
cmds: {
  ci: ['', -1],
}
```

---

## Positional

Add positional args separator to pass through remaining arguments after `--`.

**When to use**: When the command supports passing additional arguments after a separator.

**Template**:

```typescript
cmds: {
  command: { '--': '--' },
}
```

### Real example 1: run command with args

```typescript
// In npm.ts
cmds: {
  run: { '--': '--' },
}
```

**Result**: `swpm run test -- --watch` → `npm run test -- --watch`

### Real example 2: exec command with args

```typescript
// In pnpm.ts
cmds: {
  exec: { '--': '--' },
}
```

**Result**: `swpm exec -- ls -la` → `pnpm exec -- ls -la`
