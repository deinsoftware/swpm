# Templates

---

## Commands

### Replace

Replace a command (or alias) with another:

```JavaScript
cmds: {
  command: 'to',
  alias: 'to',
}
```

Example

```JavaScript
cmds: {
  remove: 'uninstall',
  r: 'uninstall',
}
```

### Replace and add a Flag

Replace a command (or alias) with another and add a flag at the end

```JavaScript
cmds: {
  command: ['to', '--flag'],
  alias: ['to', '--flag'],
}
```

Example

```JavaScript
cmds: {
  upgrade: ['install', '--latest'],
  ug: ['install', '--latest'],
}
```

### Not Available

Command (or alias) not available on the package manager

```JavaScript
cmds: {
  command: ['', -1]
}
```

Example

```JavaScript
cmds: {
  interactive: ['', -1]
}
```

### Positional

add positional args separator, key (first) for search and value (second) as separator

```JavaScript
cmds: {
  command: {'--': '--'}
}
```

Example

```JavaScript
cmds: {
  run: {'--': '--'}
}
```

---

## Args

### Replace

Replace a flag (or shorthand) with another

```JavaScript
args: {
  '--flag': '--to',
  '-f': '--to',
}
```

Example

```JavaScript
args: {
  '--save-dev': '--dev',
  '-D': '-d',
}
```

### Replace with a Command

Replace a flag (or shorthand) with a command and place in a specific position.

```JavaScript
args: {
  '--flag': ['command', 1],
  '-f': ['command', 1],
}
```

Example

```JavaScript
args: {
  '--global': ['global', 1],
  '-g': ['global', 1],
}
```

### Convert to Commands

Replace a command or alias when found a flag (or shorthand). It also removes the flag.

```JavaScript
args: {
  '--flag': {
    command: 'to',
    alias: 'to',
  }
}
```

Example

```JavaScript
args: {
  '--frozen': {
    install: 'ci',
    i: 'ci',
  }
}
```

### Remove a Command

Remove a command or alias when found a flag (or shorthand). It also removes the flag.

```JavaScript
args: {
  '--flag': {
    command: '',
    alias: '',
  }
}
```

Example

```JavaScript
args: {
  '--interactive': {
    upgrade: ''
  }
}
```

### Package Decoration

Replace a flag with a package decoration.

```JavaScript
args: {
    '--flag': ['<package>@decoration', 1],
    '-f': ['<package>@decoration', 1],
}
```

Example

```JavaScript
args: {
  '--latest': ['<package>@latest', 1],
  '-L': ['<package>@latest', 1],
}
```

### Not Available

Flag (or shorthand) not available on the package manager

```JavaScript
cmds: {
  '--flag': ['', -1],
  '-f': ['', -1],
}
```

Example

```JavaScript
cmds: {
  '--audit': ['', -1],
  '-A': ['', -1],
}
```
