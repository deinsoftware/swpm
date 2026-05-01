---
name: swpm-keepachangelog
id: swpm-keepachangelog
version: 1.0.0
tags: [swpm, changelog, keepachangelog, documentation]
description: Keep a Changelog 1.1.0 standards for SWPM. Defines format, sections, and conventions for CHANGELOG.md entries. Activates when user modifies CHANGELOG.md.
---

# SWPM Keep a Changelog Standards

Use this skill when modifying `CHANGELOG.md` or when questions arise about changelog format, sections, or entry conventions.

## When to Use

- **User is editing CHANGELOG.md** - activates to ensure entries follow Keep a Changelog 1.1.0
- Developer asks "How should I format this changelog entry?"
- Questions about what section to use (Added, Changed, Fixed, etc.)
- Updating version entries with proper date format
- **Do not use** for version number decisions (use `swpm-semver` for SemVer)

## Keep a Changelog 1.1.0 Rules

### Required Format

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- New feature description

### Changed

- Change description

## [2.6.0] - 2023-12-26

### Changed

- Revert the `--location=global` flag translation on npm

### Fixed

- Fix description here
```

### Version Line Format

✅ **Correct**:

```
## [2.6.0] - 2023-12-26
## [2.7.0-alpha] - 2023-12-26
```

❌ **Incorrect**:

```
## 2.6.0 - 2023/12/26    // Slashes, no brackets
## v2.6.0 - 2023-12-26    // Don't use 'v' prefix in heading
```

### Date Format

- **ISO 8601**: `YYYY-MM-DD` (hyphens, not slashes)
- ✅ `2023-12-26`
- ❌ `2023/12/26`
- ❌ `26-12-2023`

### Required Sections

Each version should have relevant sections:

- **Added** - for new features
- **Changed** - for changes in existing functionality
- **Deprecated** - for soon-to-be removed features
- **Removed** - for now removed features
- **Fixed** - for any bug fixes
- **Security** - in case of vulnerabilities

### Optional Sections

- **Unreleased** - section at top for upcoming changes
- **Updated** - ❌ NOT standard, don't use (use `Changed` instead)

## SWPM Changelog Conventions

### Current Issues to Fix

The current `CHANGELOG.md` has these problems:

1. **Date format**: Uses `2023/12/26` (slashes) → Should be `2023-12-26` (hyphens)
2. **Non-standard section**: Uses `### Updated` → Should use `### Changed`
3. **Missing sections**: No `### Security` in recent versions
4. **Header**: References Keep a Changelog 1.0.0 → Should reference 1.1.0

### Version Ordering

- Most recent version at the **top**
- `## [Unreleased]` section at the very top
- Older versions below in reverse chronological order

### Entry Format

```markdown
### Fixed

- volta version detection when not installed
- if volta was not installed don't take in care the volta pin version on `package.json`
```

- Use `-` (dash) for bullet points
- Use backticks for code references: `` `package.json` ``, `` `--global` ``
- Sentence case: capitalize first letter, no period at end
- Be descriptive but concise

## Example Entries

### ✅ Correct - Added

```markdown
### Added

- `bun` command and flags included in new version
- Repository helpers unit test
```

### ✅ Correct - Changed

```markdown
### Changed

- TypeScript strict configuration
- Bump package versions
```

### ✅ Correct - Fixed

```markdown
### Fixed

- `global` flag position on `yarn` and `yarn@berry`
- Get repository URL when using SSH URI
```

### ❌ Incorrect

```markdown
### Updated // Not a standard section

- Bump package versions

### Fixed

- Fixed global flag (double "fixed")
- global flag (no code backticks)
- Bump package versions. (period at end)
```

## Version Comparison Links

At the bottom of the file, include comparison links:

```markdown
[unreleased]: https://github.com/deinsoftware/swpm/compare/v2.6.0...HEAD
[2.6.0]: https://github.com/deinsoftware/swpm/compare/v2.5.2...v2.6.0
[2.5.2]: https://github.com/deinsoftware/swpm/compare/v2.5.1...v2.5.2
```

## Release Checklist

Before releasing a new version:

1. Move entries from `## [Unreleased]` to new version section
2. Add version line: `## [X.Y.Z] - YYYY-MM-DD`
3. Add appropriate sections (`### Added`, `### Changed`, etc.)
4. Add comparison link at bottom of file
5. Commit with message like `Release vX.Y.Z`

## Example Questions

**Q**: "How should I document a new command in the changelog?"
**A**: Use `### Added` section:

```markdown
### Added

- `clean` command to remove unused dependencies
```

**Q**: "What section should I use for bug fixes?"
**A**: Use `### Fixed` section:

```markdown
### Fixed

- Fix `global` flag position on yarn
```

**Q**: "Can I use `### Updated` section?"
**A**: No, use `### Changed` instead. `Updated` is not a standard Keep a Changelog section.

**Q**: "What date format should I use?"
**A**: ISO 8601 format with hyphens: `2023-12-26` (not slashes `2023/12/26`)

**Q**: "Where should the new version go in the file?"
**A**: At the top, after `## [Unreleased]`, most recent first.

## Observations

Before helping with changelog edits:

- Check current `CHANGELOG.md` format
- Verify date format uses hyphens not slashes
- Ensure sections are standard (Added, Changed, Deprecated, Removed, Fixed, Security)
- Check if `## [Unreleased]` section exists at top
- Verify version comparison links at bottom of file
- Reference: https://keepachangelog.com/en/1.1.0/

## Reference

Full Keep a Changelog specification: https://keepachangelog.com/en/1.1.0/
