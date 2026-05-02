---
name: swpm-conventional-commits
id: swpm-conventional-commits
version: 1.0.0
tags: [swpm, conventional-commits, git, commit-messages]
description: Conventional Commits 1.0.0 specification for SWPM. Defines commit message format with types (feat, fix, etc.), scopes, breaking changes, and body/footer conventions. Activates when writing commit messages or modifying git commits.
---

# SWPM Conventional Commits Standards

Use this skill when writing commit messages, questions about commit format, or when modifying git commits for SWPM.

## When to Use

- **User is writing a commit message** - activates to ensure Conventional Commits 1.0.0 format
- Developer asks "What type should this commit be?"
- Questions about commit message structure
- Adding breaking changes to commits
- **Do not use** for CHANGELOG formatting (use `swpm-keepachangelog`) or version numbering (use `swpm-semver`)

## Conventional Commits 1.0.0 Rules

### Commit Message Structure

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

Required type prefix:

- **feat**: A new feature (correlates with MINOR in SemVer)
- **fix**: A bug fix (correlates with PATCH in SemVer)
- **BREAKING CHANGE**: Introduces breaking API change (correlates with MAJOR in SemVer)

### Additional Types (not mandated by spec, but allowed)

- **build**: Changes that affect build system or external dependencies
- **chore**: Other changes that don't modify src or test files
- **ci**: Changes to CI configuration files and scripts
- **docs**: Documentation only changes
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting)
- **test**: Adding missing tests or correcting existing tests

### Scope (Optional)

```
feat(parser): add ability to parse arrays
fix(api): resolve null pointer exception
```

Scope MUST be a noun describing a section of the codebase surrounded by parentheses.

### Breaking Changes

#### Option 1: Using ! after type/scope

```
feat!: send an email to the customer when a product is shipped
feat(api)!: send an email to the customer when a product is shipped
```

#### Option 2: Using BREAKING CHANGE footer

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

### Description

- MUST immediately follow the colon and space after type/scope
- Short summary of the code changes
- Use imperative mood: "add" not "added" or "adds"

### Body (Optional)

- MUST begin one blank line after the description
- Free-form and MAY consist of any number of newline separated paragraphs
- Provide additional contextual information

### Footers (Optional)

- MUST begin one blank line after the body
- Each footer MUST consist of a word token, followed by either `: ` or ` #`
- Token MUST use `-` instead of whitespace (e.g., `Reviewed-by`)
- Exception: `BREAKING CHANGE` MAY be uppercase

## SWPM Commit Conventions

### Commit Message Examples

#### ✅ Correct - Simple fix

```
fix: resolve volta version detection when not installed
```

#### ✅ Correct - New feature with scope

```
feat(commands): add support for bun package manager
```

#### ✅ Correct - Breaking change with !

```
feat!: remove deprecated `why` command

BREAKING CHANGE: The `why` command has been removed. Use `pnpm why` directly.
```

#### ✅ Correct - With body and footers

```
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Reviewed-by: equiman
Refs: #123
```

#### ✅ Correct - Build/CI changes

```
build: upgrade dependencies to latest versions

chore: update package.json scripts
ci: add Node.js 20 to build matrix
docs: update README with new command examples
test: add unit tests for args translator
refactor: simplify command translation logic
```

#### ❌ Incorrect

```
fixed bug                       // Wrong type, not imperative
add new feature                // Missing type prefix
Feat: new command              // Wrong case (should be lowercase)
feat: add feature

extra line                    // Extra blank line in wrong place
```

## Mapping to SemVer

Conventional Commits maps to Semantic Versioning:

- **fix** → **PATCH** (e.g., `2.6.0` → `2.6.1`)
- **feat** → **MINOR** (e.g., `2.6.0` → `2.7.0`)
- **BREAKING CHANGE** → **MAJOR** (e.g., `2.6.0` → `3.0.0`)

## Commit Checklist

Before committing:

1. Determine the correct type (feat, fix, etc.)
2. Add scope if applicable: `feat(parser):`
3. Write imperative description after `: `
4. Add `!` or `BREAKING CHANGE:` footer for breaking changes
5. Add body with blank line separation if needed
6. Add footers (Reviewed-by, Refs, etc.) if needed
7. Ensure description uses imperative mood

## Example Questions

**Q**: "What type should I use for updating dependencies?"
**A**: Use `build:` or `chore:`:

```
build: upgrade dependencies to latest versions
```

**Q**: "How do I indicate a breaking change?"
**A**: Use `!` after type or add `BREAKING CHANGE:` footer:

```
feat!: remove deprecated command

BREAKING CHANGE: Command removed in this version.
```

**Q**: "What's the difference between feat and fix?"
**A**: `feat` adds new functionality (→ MINOR version), `fix` patches bugs (→ PATCH version).

**Q**: "Can I use multiple types in one commit?"
**A**: No, each commit should have one type. Make separate commits for different changes.

**Q**: "Should I use uppercase FEAT or lowercase feat?"
**A**: Use lowercase `feat:`, but `BREAKING CHANGE:` footer MUST be uppercase.

## Observations

Before helping with commit messages:

- Check if the change is a new feature (feat), bug fix (fix), or breaking change (BREAKING CHANGE)
- Determine if a scope applies (e.g., `commands`, `args`, `docs`)
- Verify description uses imperative mood ("add" not "added")
- Check if commit includes body/footers
- Reference: https://www.conventionalcommits.org/en/v1.0.0/

## Reference

Full Conventional Commits specification: https://www.conventionalcommits.org/en/v1.0.0/
