---
name: swpm-semver
id: swpm-semver
version: 1.0.0
tags: [swpm, semver, versioning, release, changelog]
description: Semantic Versioning 2.0.0 guidelines for SWPM. Defines version increment rules and activates when user modifies CHANGELOG.md or updates version in package.json.
---

# SWPM Semantic Versioning (SemVer 2.0.0)

Use this skill when questions arise about version numbering, when to increment versions, release planning, or **when modifying CHANGELOG.md** for SWPM.

## When to Use

- Developer asks "What version should I release?"
- Questions about when to increment major/minor/patch
- Pre-release versioning questions
- Understanding version precedence
- **User is editing CHANGELOG.md** - use this skill to ensure entries follow SemVer 2.0.0 and Keep a Changelog format
- **User is updating version in package.json** - use this skill to determine correct major/minor/patch bump
- **Do not use** for code style or architecture questions

## SemVer 2.0.0 Rules

Given a version number MAJOR.MINOR.PATCH:

- **MAJOR**: Increment when you make incompatible API changes
- **MINOR**: Increment when you add functionality in a backward compatible manner
- **PATCH**: Increment when you make backward compatible bug fixes

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

## SWPM Version Guidelines

### Current Version

Check `package.json` for current version:

```json
{
  "version": "2.6.0"
}
```

### Version Increment Rules

#### PATCH (x.y.Z) - Backward compatible bug fixes

- Fix bugs without changing public API
- Documentation updates
- Internal refactoring without behavior changes
- Performance improvements

Example: `2.6.0` → `2.6.1`

#### MINOR (x.Y.z) - Backward compatible new features

- Add new commands
- Add new arguments to existing commands
- Mark functionality as deprecated
- Substantial improvements to existing features
- Reset patch to 0

Example: `2.6.0` → `2.7.0`

#### MAJOR (X.y.z) - Incompatible changes

- Remove or rename commands
- Change existing command behavior (breaking change)
- Remove arguments or change their meaning
- Reset minor and patch to 0

Example: `2.6.0` → `3.0.0`

## Pre-release Versions

For testing before stable release:

```
2.7.0-alpha
2.7.0-alpha.1
2.7.0-beta
2.7.0-rc.1
```

Pre-release versions have lower precedence than the associated normal version.

## Build Metadata

Build metadata is ignored when determining version precedence:

```
2.6.0+build.123
2.6.0-beta+build.456
```

Both are equivalent to `2.6.0` for precedence.

## Version Precedence

Compare versions from left to right:

```
1.0.0 < 2.0.0 < 2.1.0 < 2.1.1
1.0.0-alpha < 1.0.0
1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-beta
```

## Initial Development (0.y.z)

SWPM is already at version 2.x.x, so this doesn't apply. However, for reference:

- Version `0.y.z` is for initial development
- Anything may change at any time
- Public API should not be considered stable

## Release Checklist

Before releasing a new version:

1. Update version in `package.json`
2. Update `CHANGELOG.md` with changes following Keep a Changelog format:
   - Use `YYYY-MM-DD` date format (not slashes)
   - Sections: `### Added`, `### Changed`, `### Deprecated`, `### Removed`, `### Fixed`, `### Security`
   - Entry format: `- Description of change`
3. Run `npm run build` to verify build works
4. Run `npm run test` to verify no regressions
5. Create git tag: `git tag v2.x.x`
6. Push tag: `git push origin v2.x.x`

## CHANGELOG Format Rules

SWPM follows **Keep a Changelog 1.0.0**:

```markdown
## [2.6.0] - 2023-12-26

### Changed

- Revert the `--location=global` flag translation on npm

### Updated

- Bump package versions
```

### Required sections:

- `### Added` - for new features
- `### Changed` - for changes in existing functionality
- `### Deprecated` - for once-stable features removed in upcoming releases
- `### Removed` - for deprecated features removed in this release
- `### Fixed` - for any bug fixes
- `### Security` - to invite users to upgrade in case of vulnerabilities

### Date format:

- ✅ Correct: `2023-12-26` (YYYY-MM-DD with hyphens)
- ❌ Incorrect: `2023/12/26` (slashes)

## Example Questions

**Q**: "I fixed a bug, what version should I release?"
**A**: Increment PATCH version (e.g., `2.6.0` → `2.6.1`)

**Q**: "I added a new command, what version should I release?"
**A**: Increment MINOR version (e.g., `2.6.0` → `2.7.0`)

**Q**: "I removed a command, what version should I release?"
**A**: Increment MAJOR version (e.g., `2.6.0` → `3.0.0`)

**Q**: "Can I release 2.6.0-alpha?"
**A**: Yes, use pre-release tags for testing: `2.7.0-alpha`, `2.7.0-beta`, etc.

**Q**: "What's the difference between 2.6.0+build.1 and 2.6.0+build.2?"
**A**: Build metadata is ignored for precedence, both are equivalent to `2.6.0`

## Observations

Before answering versioning questions:

- Check current version in `package.json`
- Review `CHANGELOG.md` for recent changes and format compliance
- Determine if changes are breaking, features, or fixes
- Verify if changes affect the public API
- Check if pre-release is needed for testing
- When CHANGELOG.md is modified, ensure entries follow Keep a Changelog format

## Reference

Full SemVer 2.0.0 specification: https://semver.org/
