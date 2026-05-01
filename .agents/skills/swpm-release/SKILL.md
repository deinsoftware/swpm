---
name: swpm-release
id: swpm-release
version: 1.0.0
tags: [swpm, release, version, changelog, automation]
description: Automated release script for SWPM. Updates version in package.json, moves `[Unreleased]` entries to new version section in CHANGELOG.md, and follows SemVer and Keep a Changelog standards.
arguments: [version]
disable-model-invocation: true
user-invocable: true
---

# SWPM Release Automation

Use this skill when preparing a new release. The skill provides an executable script that automates version bumping and CHANGELOG updates.

## When to Use

- Developer wants to prepare a new release
- Need to update version in `package.json`
- Need to move `[Unreleased]` entries to a new version section
- Questions about release process automation
- **Do not use** for manual versioning decisions (use `swpm-semver` instead)

## What This Skill Does

The executable script `scripts/release.js` automates:

1. **Reads current version** from `package.json`
2. **Prompts for version type**: major, minor, or patch (following SemVer 2.0.0)
3. **Updates version** in `package.json`
4. **Reads `[Unreleased]` section** from `CHANGELOG.md`
5. **Creates new version section** with current date in proper format
6. **Moves entries** from `[Unreleased]` to new version section
7. **Preserves comparison links** at the bottom of CHANGELOG.md

## Usage

### How to Invoke

Run the script directly with Node.js:

```bash
node .agents/skills/swpm-release/scripts/release.js
```

Or make it executable and run:

```bash
chmod +x .agents/skills/swpm-release/scripts/release.js
./agents/skills/swpm-release/scripts/release.js
```

### What the Script Does

The script will:

- Prompt for version type (major/minor/patch)
- Show current version and calculated new version
- Ask for confirmation
- Update `package.json`
- Move `[Unreleased]` entries to new version section in `CHANGELOG.md`
- Update comparison links at bottom of CHANGELOG.md
- Display the tag and CHANGELOG content for the new version (ready to copy/paste)

### Example Session

```
Current version: 2.6.0
Select version bump:
  1) patch (2.6.1)
  2) minor (2.7.0)
  3) major (3.0.0)
Choice: 2

New version will be: 2.7.0
Proceed? (y/N): y

Updating package.json to 2.7.0...
Moving [Unreleased] entries to [2.7.0] - 2026-05-01...
Updating comparison links...
Release 2.7.0 prepared successfully!
```

## Prerequisites

- Node.js >= 20
- `package.json` with current version
- `CHANGELOG.md` with `[Unreleased]` section at the top

## Script Location

```
.agents/skills/swpm-release/
├── SKILL.md
└── scripts/
    └── release.js
```

## Example Questions

**Q**: "How do I prepare a new release?"
**A**: Run `node .agents/skills/swpm-release/scripts/release.js` and follow the prompts.

**Q**: "What does the release script do?"
**A**: It bumps the version in package.json and moves [Unreleased] entries to a new version section in CHANGELOG.md.

**Q**: "Can I run the script multiple times?"
**A**: Yes, but it will overwrite the [Unreleased] section each time. Make sure to commit changes between releases.

## Observations

Before running the release script:

- Ensure `[Unreleased]` section in CHANGELOG.md has entries
- Verify the version bump type (check `swpm-semver` skill for guidance)
- Review the changes after running the script
- Commit with message like `Release vX.Y.Z`
- Create git tag manually: `git tag vX.Y.Z` (you control the publish hook)
- Push: `git push origin vX.Y.Z`

## Reference

- SemVer 2.0.0: https://semver.org/spec/v2.0.0.html
- Keep a Changelog 1.1.0: https://keepachangelog.com/en/1.1.0/
