# Args Templates

## Replace

Replace a flag (or shorthand) with another flag in the target package manager.

**When to use**: When flag names differ between package managers but have the same behavior.

**Template**:

```typescript
args: {
  '--flag': '--to',
  '-f': '--to',
}
```

### Real example 1: pnpm --save-dev → --dev

```typescript
// In pnpm.ts
args: {
  '--save-dev': '--dev',
  '-D': '-d',
}
```

**Result**: `swpm add express --save-dev` → `pnpm add express --dev`

### Real example 2: bun --production → --prod

```typescript
// In bun.ts
args: {
  '--production': '--prod',
  '-p': '--prod',
}
```

---

## Replace with a Command

Replace a flag (or shorthand) with a command and place it at a specific position.

**When to use**: When a flag in one package manager is a separate command in another.

**Template**:

```typescript
args: {
  '--flag': ['command', position],
  '-f': ['command', position],
}
```

### Real example 1: pnpm --global → global command

```typescript
// In pnpm.ts
args: {
  '--global': ['global', 1],
  '-g': ['global', 1],
}
```

**Result**: `swpm add express --global` → `pnpm global add express`

### Real example 2: deno --global → not supported

```typescript
// In deno.ts
args: {
  '--global': ['', -1],
  '-g': ['', -1],
}
```

---

## Convert to Commands

Replace the main command when a flag (or shorthand) is found. The flag is removed from the output.

**When to use**: When a flag triggers a completely different command.

**Template**:

```typescript
args: {
  '--flag': {
    command: 'to',
    alias: 'to',
  },
}
```

### Real example 1: pnpm --frozen → ci

```typescript
// In pnpm.ts
args: {
  '--frozen': {
    install: 'ci',
    i: 'ci',
  },
}
```

**Result**: `swpm install --frozen` → `pnpm ci`

### Real example 2: yarn --frozen → frozen-install

```typescript
// In yarn.ts
args: {
  '--frozen': {
    install: 'frozen-install',
  },
}
```

---

## Remove a Command

Remove the main command when a flag (or shorthand) is found. The flag is also removed.

**When to use**: When a flag makes the command unnecessary or invalid.

**Template**:

```typescript
args: {
  '--flag': {
    command: '',
    alias: '',
  },
}
```

### Real example 1: upgrade --interactive → remove command

```typescript
// In some manager config
args: {
  '--interactive': {
    upgrade: '',
  },
}
```

**Result**: `swpm upgrade --interactive` → Command removed

### Real example 2: install --dry-run → remove command

```typescript
// In bun.ts
args: {
  '--dry-run': {
    install: '',
  },
}
```

---

## Package Decoration

Replace a flag with a package decoration pattern (add suffix to package name at position).

**When to use**: When a flag should add a decorator like `@latest`, `@next` to package names.

**Template**:

```typescript
args: {
  '--flag': ['<package>@decoration', position],
  '-f': ['<package>@decoration', position],
}
```

### Real example 1: npm --latest → @latest

```typescript
// In npm.ts
args: {
  '--latest': ['<package>@latest', 1],
  '-L': ['<package>@latest', 1],
}
```

**Result**: `swpm add express --latest` → `npm install express@latest`

### Real example 2: pnpm --next → @next

```typescript
// In pnpm.ts
args: {
  '--next': ['<package>@next', 1],
  '-N': ['<package>@next', 1],
}
```

---

## Not Available

Flag (or shorthand) not available on the package manager.

**When to use**: When a flag is not supported and should be ignored or cause an error.

**Template**:

```typescript
args: {
  '--flag': ['', -1],
  '-f': ['', -1],
}
```

### Real example 1: npm --audit → not available

```typescript
// In npm.ts
args: {
  '--audit': ['', -1],
  '-A': ['', -1],
}
```

**Result**: `swpm install --audit` → Flag ignored

### Real example 2: bun --hoist → not available

```typescript
// In bun.ts
args: {
  '--hoist': ['', -1],
}
```
