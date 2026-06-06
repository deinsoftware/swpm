# Changelog

<!-- http://keepachangelog.com/en/1.0.0/
Added       for new features.
Changed     for changes in existing functionality.
Deprecated  for once-stable features removed in upcoming releases.
Removed     for deprecated features removed in this release.
Fixed       for any bug fixes.
Security    to invite users to upgrade in case of vulnerabilities.
-->

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.0] - 2026-06-06

### ⚠️ BREAKING CHANGES

- Node.js Requirement: The minimum supported version is now Node.js v20. This change aligns with the underlying updates in the CLI engine and modern security standards.

### Added

- Status Command: Introduced `swpm status` (alias `s`) to show current configuration in different formats (`json`, `json:path`, `plain:path`). Especially useful for CI tools and scripts.
- Formal validation for the latest Node.js LTS releases.

### Changed

- Major CLI Engine Upgrade: Migrated yargs from v17.7.2 to v18.0.0, providing better performance and modern ESM argument parsing.
- Dependency Refresh: Comprehensive update of core libraries including chalk, update-notifier, semver, and open to ensure compatibility with the new major version.
- Typing System: Updated @types/yargs to v17.0.35 for improved developer experience and type safety.

### Fixed

- Security & Vulnerabilities: Applied multiple patches identified by Snyk across the dependency tree.
- Parser Consistency: Refined the internal command mapping to ensure that flags and aliases behave consistently across all supported package managers (npm, pnpm, yarn, and bun) under the new v18 parser.

## [2.7.0] - 2026-05-02

### Added

- Add AI agent skills system with 8 self-contained skills in `.agents/skills/`
- Add `swpm-release` skill with bash script for automated version bumping
- Add `swpm-code-review` skill with bash script for automated code review
- Add `swpm-manage-commands-args` skill with templates for cmds/args mappings
- Add `swpm-dev-guide` skill for local development setup
- Add `swpm-dev-standards` skill with examples (typing, naming, patterns, SOLID)
- Add `swpm-semver` skill for Semantic Versioning 2.0.0 guidelines
- Add `swpm-conventional-commits` skill for Conventional Commits 1.0.0
- Add `swpm-keepachangelog` skill for Keep a Changelog 1.1.0 standards

### Changed

- Update `CHANGELOG.md` to Keep a Changelog 1.1.0 standard (ISO dates, comparison links)
- Update `AGENTS.md` with all 8 skills references

### Removed

- Remove `DEVS.md` (replaced by `swpm-dev-guide` skill)
- Remove `TEMPLATES.md` (replaced by skill templates)

## [2.6.0] - 2023-12-26

### Changed

- Revert the `--location=global` flag translation on npm, [the warning message was fixed and deprecated](https://github.com/npm/statusboard/issues/518)

### Changed

- Bump package versions

## [2.5.2] - 2023-10-31

### Fixed

- volta version detection when not installed
- if volta was not installed don't take in care the volta pin version on `package.json`

## [2.5.1] - 2023-10-19

### Fixed

- get repository url when using ssh uri

### Added

- repository helpers unit test

## [2.5.0] - 2023-10-19

### Changed

- typescript strict configuration
- bump package versions

### Fixed

- `--global` flag position on `yarn` and `yarn@berry` with `interactive` command

### Added

- e2e testing for complete set of commands and aliases

## [2.4.0] - 2023-10-16

### Added

- prompt to continue excluding incompatible flags
- e2e testing for `install` and `add` commands

### Fixed

- `global` flag position on `yarn` and `yarn@berry`
- `package` parameter on `add` command

## [2.3.1] - 2023-10-04

### Fixed

- avoid `open` and `clean` finish as package manager translation

## [2.3.0] - 2023-09-26

### Added

- `bun` command and flags included in new version

## [2.2.1] - 2023-09-26

### Fixed

- Readme title

## [2.2.0] - 2023-09-26

### Changed

- `--use` and `--pin` flag now ask to the user if want to run the `set version` command for `yarn`

## [2.1.0] - 2023-09-25

### Added

- `open` command to easy access the file explorer or open repository urls in the browser

## [2.0.0] - 2023-09-21

### Changed

- full migration from JavaScript to TypeScript

### Added

- `upgrade` command with interactive mode
- `interactive` command

### Removed

- `reinstall` command

## [1.12.0] - 2023-08-26

### Added

- `--production` flag

### Changed

- `add` command now pass through `--production` flag

## [1.10.8] - 2023-06-20

### Fixed

- `volta` version detection

## [1.10.5] - 2023-05-27

### Fixed

- file extension on imports

## [1.10.4] - 2023-05-22

### Fixed

- `package.json` detection with `volta`

## [1.10.3] - 2023-05-21

### Changed

- `add` command now pass through `build` command for `deno`

## [1.10.0] - 2023-04-28

### Added

- `deno` support (v1.28+)

### Changed

- replace `args` helper to translate flags

### Fixed

- `deno` cache and lock files detection
- `add` command with `--save-*` flags

## [1.8.0] - 2023-03-28

### Added

- `info` command
- `--info` flag

### Changed

- `get` helper refactor
- prompt module from `@inquirer/prompts` to `prompts`

## [1.7.2] - 2023-03-12

### Fixed

- `package.json` detection with `volta` when not installed

## [1.7.1] - 2023-03-11

### Fixed

- `package.json` detection with `volta`

## [1.7.0] - 2023-03-04

### Added

- `yarn@berry` support

### Changed

- refactor `packages` helper

## [1.5.0] - 2023-02-28

### Added

- `create` command
- `upgrade` command

### Changed

- refactor `get` helper
- replace `chalk` to `colors` to `chalk` again

## [1.4.3] - 2023-02-28

### Fixed

- `upgrade` command with `--latest` flag

## [1.4.2] - 2023-02-24

### Fixed

- `add` command with multiple packages

## [1.4.1] - 2023-02-18

### Changed

- `upgrade` command now run `update` instead of `upgrade`

## [1.4.0] - 2023-02-06

### Added

- `upgrade` command with `--latest` flag

### Changed

- refactor `debug` helper

## [1.3.0] - 2023-02-06

### Added

- `reinstall` command

## [1.2.0] - 2023-02-05

### Added

- `--use` and `--pin` flags

### Changed

- `see` option renamed to `info` option

## [1.1.0] - 2023-02-04

### Added

- `run` command with args support

### Changed

- replace `args` helper to translate commands

## [1.0.3] - 2023-02-03

### Fixed

- `reinstall` command now run `install` command

## [1.0.2] - 2023-02-02

### Added

- `--no-save` flag for `npm` and `yarn`
- `--no-save-dev` flag for `yarn`

### Changed

- `pin` and `use` flags now use `volta` when it's installed

## [1.0.1] - 2023-02-02

### Fixed

- `add` command with `--save-dev` flag

## [1.0.0] - 2023-02-02

### Added

- stable release

## [0.14.1] - 2012-12-14

### Fixed

- Sponsors url

## [0.14.0] - 2012-12-13

### Added

- `swpx` to run packages remotely without installing

### Fixed

- OS compatibility for command exists on `--info` flag

## [0.13.2] - 2012-12-13

### Fixed

- Readme with no available commands and args for bun

## [0.13.1] - 2012-12-12

### Fixed

- Published npm version

## [0.13.0] - 2012-12-12

### Added

- Support basic `bun` commands as package manager
- `--package-lock` flag for `install` command

### Changed

- Replace `--frozen-lock` to `--immutable` on yarn
- Alias for `--frozen-lock` and `package-lock` for `install` command

### Fixed

- Not compatible flag warning message

## [0.12.2] - 2012-12-09

### Fixed

- Clarification about how to use a package manager by default

## [0.12.1] - 2012-07-25

### Fixed

- `main` property on package

## [0.12.0] - 2012-07-01

### Changed

- security update on `update-notifier` package

## [0.11.3] - 2012-06-02

### Fixed

- clean flags used for `swpm` on translated command

## [0.11.2] - 2012-06-02

### Fixed

- `interactive` command not requires a package parameter
- add missing `latest` flag to `interactive` command

## [0.11.1] - 2012-06-02

### Fixed

- update notifier

## [0.11.0] - 2012-06-01

### Added

- `update`, `upgrade` and `interactive` command

### Changed

- `debug` now use inspect to print the full depth object

## [0.10.2] - 2012-06-01

### Fixed

- get package manager from environment variable or lock files

## [0.10.1] - 2012-06-01

### Fixed

- avoid duplications when use flag and alias
- update deprecated `--global` flag on `npm`

## [0.10.0] - 2012-06-01

### Added

- `clean` command

### Fixed

- `info` command not using volta
- conflicts commands and flags exclusion

## [0.9.1] - 2012-05-27

### Fixed

- update notifier message with ESM compatibility
- not available flags message warning

## [0.9.0] - 2012-05-26

### Added

- `args` helpers unit testing
- update notifier message

### Changed

- `eslint` and `vitest` versions

## [0.8.0] - 2012-05-25

### Added

- `swpx` command for testing purpose

### Changed

- refactor code removing `globalThis`

## [0.7.2] - 2012-05-23

### Fixed

- `remove` command alias

## [0.7.1] - 2012-05-23

### Added

- `--save-optional` and `--save-peer` flags to `add` command
- `remove` command

### Fixed

- No `<package>` validations on `install` command

## [0.7.0] - 2012-05-23

### Added

- prefix command with an icon, showing the source of the package manager detection

## [0.6.1] - 2012-05-22

### Fixed

- not showing icons with `--use` flag

## [0.6.0] - 2012-05-22

### Added

- show command with the package color

## [0.5.0] - 2012-05-21

### Added

- Main project structure
- Package Manager detection
- `pin`, `use`, `get`, `see` and `info` options
- Pinned validation

## [0.4.2] - 2012-05-21

### Fixed

- get command

## [0.4.1] - 2012-05-20

### Fixed

- `volta` detection for `--use` flag
- add volta detection to `--info` flag

### Added

- supported shared commands to documentation

## [0.4.0] - 2012-05-20

### Added

- first version that translate commands `install` (`--frozen-lockfile` and `add` (`--global`, `--save-dev`, `--save-exact`) commands

### Changed

- `--frozen-lockfile` flag was replaced for `--frozen` on install command
- yargs refactor
- structure project reorder

## [0.3.0] - 2012-05-19

### Changed

- tweet action to support twitter API v2

## [0.2.3] - 2012-05-18

### Changed

- options to flags

## [0.2.2] - 2012-05-18

### Fixed

- current package manager from `packageManager` property

## [0.2.1] - 2012-05-18

### Changed

- folder structure

## [0.2.0] - 2012-05-18

### Added

- add `engine` and `packageManager` properties

## [0.1.2] - 2012-05-18

### Changed

- add `engine` and `packageManager` properties

## [0.1.1] - 2012-05-18

### Fixed

- github actions
- readme commands

## [0.1.0] - 2012-05-17

### Added

- yargs middleware to reporcesses the Package Manager to use

### Changed

- `see` option renamed to `test`
- `version` option was renamed and merged with `info` option

### Fixed

- get selected Package Manager configuration one time
- `fileExists` validation problem with `async` calls

## [0.0.5] - 2012-05-17

### Fixed

- local path with ESM
- file existing validation

## [0.0.4] - 2012-05-17

### Fixed

- get command

## [0.0.3] - 2012-05-17

### Fixed

- readme help command and link

### Changed

- social image preview
- show command with the package color

## [0.0.2] - 2012-05-16

### Added

- Icons, social and logos

## [0.0.1] - 2012-05-15

### Added

- Main project structure
- Package Manager detection
- `pin`, `use`, `get`, `see` and `info` options
- Pinned validation

[unreleased]: https://github.com/deinsoftware/swpm/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/deinsoftware/swpm/compare/v2.7.0...v3.0.0
[2.7.0]: https://github.com/deinsoftware/swpm/compare/v2.6.0...v2.7.0
[2.6.0]: https://github.com/deinsoftware/swpm/compare/v2.5.2...v2.6.0
[2.5.2]: https://github.com/deinsoftware/swpm/compare/v2.5.1...v2.5.2
[2.5.1]: https://github.com/deinsoftware/swpm/compare/v2.5.0...v2.5.1
[2.5.0]: https://github.com/deinsoftware/swpm/compare/v2.4.0...v2.5.0
[2.4.0]: https://github.com/deinsoftware/swpm/compare/v2.3.1...v2.4.0
[2.3.1]: https://github.com/deinsoftware/swpm/compare/v2.3.0...v2.3.1
[2.3.0]: https://github.com/deinsoftware/swpm/compare/v2.2.1...v2.3.0
[2.2.1]: https://github.com/deinsoftware/swpm/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/deinsoftware/swpm/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/deinsoftware/swpm/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/deinsoftware/swpm/compare/v1.12.0...v2.0.0
[1.12.0]: https://github.com/deinsoftware/swpm/compare/v1.10.8...v1.12.0
[1.10.8]: https://github.com/deinsoftware/swpm/compare/v1.10.5...v1.10.8
[1.10.5]: https://github.com/deinsoftware/swpm/compare/v1.10.4...v1.10.5
[1.10.4]: https://github.com/deinsoftware/swpm/compare/v1.10.3...v1.10.4
[1.10.3]: https://github.com/deinsoftware/swpm/compare/v1.10.0...v1.10.3
[1.10.0]: https://github.com/deinsoftware/swpm/compare/v1.8.0...v1.10.0
[1.8.0]: https://github.com/deinsoftware/swpm/compare/v1.7.2...v1.8.0
[1.7.2]: https://github.com/deinsoftware/swpm/compare/v1.7.1...v1.7.2
[1.7.1]: https://github.com/deinsoftware/swpm/compare/v1.7.0...v1.7.1
[1.7.0]: https://github.com/deinsoftware/swpm/compare/v1.5.0...v1.7.0
[1.5.0]: https://github.com/deinsoftware/swpm/compare/v1.4.3...v1.5.0
[1.4.3]: https://github.com/deinsoftware/swpm/compare/v1.4.2...v1.4.3
[1.4.2]: https://github.com/deinsoftware/swpm/compare/v1.4.1...v1.4.2
[1.4.1]: https://github.com/deinsoftware/swpm/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/deinsoftware/swpm/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/deinsoftware/swpm/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/deinsoftware/swpm/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/deinsoftware/swpm/compare/v1.0.3...v1.1.0
[1.0.3]: https://github.com/deinsoftware/swpm/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/deinsoftware/swpm/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/deinsoftware/swpm/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/deinsoftware/swpm/compare/v0.14.1...v1.0.0
[0.14.1]: https://github.com/deinsoftware/swpm/compare/v0.14.0...v0.14.1
[0.14.0]: https://github.com/deinsoftware/swpm/compare/v0.13.2...v0.14.0
[0.13.2]: https://github.com/deinsoftware/swpm/compare/v0.13.1...v0.13.2
[0.13.1]: https://github.com/deinsoftware/swpm/compare/v0.13.0...v0.13.1
[0.13.0]: https://github.com/deinsoftware/swpm/compare/v0.12.2...v0.13.0
[0.12.2]: https://github.com/deinsoftware/swpm/compare/v0.12.1...v0.12.2
[0.12.1]: https://github.com/deinsoftware/swpm/compare/v0.12.0...v0.12.1
[0.12.0]: https://github.com/deinsoftware/swpm/compare/v0.11.3...v0.12.0
[0.11.3]: https://github.com/deinsoftware/swpm/compare/v0.11.2...v0.11.3
[0.11.2]: https://github.com/deinsoftware/swpm/compare/v0.11.1...v0.11.2
[0.11.1]: https://github.com/deinsoftware/swpm/compare/v0.11.0...v0.11.1
[0.11.0]: https://github.com/deinsoftware/swpm/compare/v0.10.2...v0.11.0
[0.10.2]: https://github.com/deinsoftware/swpm/compare/v0.10.1...v0.10.2
[0.10.1]: https://github.com/deinsoftware/swpm/compare/v0.10.0...v0.10.1
[0.10.0]: https://github.com/deinsoftware/swpm/compare/v0.9.1...v0.10.0
[0.9.1]: https://github.com/deinsoftware/swpm/compare/v0.9.0...v0.9.1
[0.9.0]: https://github.com/deinsoftware/swpm/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/deinsoftware/swpm/compare/v0.7.2...v0.8.0
[0.7.2]: https://github.com/deinsoftware/swpm/compare/v0.7.1...v0.7.2
[0.7.1]: https://github.com/deinsoftware/swpm/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/deinsoftware/swpm/compare/v0.6.1...v0.7.0
[0.6.1]: https://github.com/deinsoftware/swpm/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/deinsoftware/swpm/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/deinsoftware/swpm/compare/v0.4.2...v0.5.0
[0.4.2]: https://github.com/deinsoftware/swpm/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/deinsoftware/swpm/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/deinsoftware/swpm/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/deinsoftware/swpm/compare/v0.2.3...v0.3.0
[0.2.3]: https://github.com/deinsoftware/swpm/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/deinsoftware/swpm/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/deinsoftware/swpm/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/deinsoftware/swpm/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/deinsoftware/swpm/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/deinsoftware/swpm/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/deinsoftware/swpm/compare/v0.0.5...v0.1.0
[0.0.5]: https://github.com/deinsoftware/swpm/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/deinsoftware/swpm/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/deinsoftware/swpm/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/deinsoftware/swpm/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/deinsoftware/swpm/releases/tag/v0.0.1
