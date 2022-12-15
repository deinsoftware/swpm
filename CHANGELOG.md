# Changelog

<!-- http://keepachangelog.com/en/1.0.0/
Added       for new features.
Changed     for changes in existing functionality.
Deprecated  for once-stable features removed in upcoming releases.
Removed     for deprecated features removed in this release.
Fixed       for any bug fixes.
Security    to invite users to upgrade in case of vulnerabilities.
-->

## 1.0.0 - 2022/12/15

### Added

- `si` alias for `swpm install`
- `sa` alias for `swpm add`

### Changed

- Upgrade `node` version to 19

## 0.14.1 - 2022/12/14

### Fixed

- Sponsors url

## 0.14.0 - 2022/12/13

### Added

- `swpx` to run packages remotely without installing

### Fixed

- OS compatibility for command exists on `--info` flag

## 0.13.2 - 2022/12/13

### Fixed

- Readme with no available commands and args for bun

## 0.13.1 - 2022/12/12

### Fixed

- Published npm version

## 0.13.0 - 2022/12/12

### Added

- Support basic `bun` commands as package manager
- `--package-lock` flag for `install` command

### Changed

- Replace `--frozen-lock` to `--immutable` on yarn
- Alias for `--frozen-lock` and `package-lock` for `install` command

### Fixed

- Not compatible flag warning message

## 0.12.2 - 2022/12/09

### Fixed

- Clarification about how to use a package manager by default

## 0.12.1 - 2022/07/25

### Fixed

- `main` property on package

## 0.12.0 - 2022/07/01

### Changed

- security update on `update-notifier` package

## 0.11.3 - 2022/06/02

### Fixed

- clean flags used for `swpm` on translated command

## 0.11.2 - 2022/06/02

### Fixed

- `interactive` command not requires a package parameter
- add missing `latest` flag to `interactive` command

## 0.11.1 - 2022/06/02

### Fixed

- update notifier

## 0.11.0 - 2022/06/01

### Added

- `update`, `upgrade` and `interactive` command

### Changed

- `debug` now use inspect to print the full depth object

## 0.10.2 - 2022/06/01

### Fixed

- get package manager from environment variable or lock files

## 0.10.1 - 2022/06/01

### Fixed

- avoid duplications when use flag and alias
- update deprecated `--global` flag on `npm`

## 0.10.0 - 2022/06/01

### Added

- `clean` command

### Fixed

- `info` command not using volta
- conflicts commands and flags exclusion

## 0.9.1 - 2022/05/27

### Fixed

- update notifier message with ESM compatibility
- not available flags message warning

## 0.9.0 - 2022/05/26

### Added

- `args` helpers unit testing
- update notifier message

### Changed

- `eslint` and `vitest` versions

## 0.8.0 - 2022/05/25

### Added

- `swpx` command for testing purpose

### Changed

- refactor code removing `globalThis`

## 0.7.1 - 2022/05/23

### Fixed

- `remove` command alias

## 0.7.0 - 2022/05/23

### Added

- `--save-optional` and `--save-peer` flags to `add` command
- `remove` command

### Fixed

- No `<package>` validations on `install` command

## 0.6.1 - 2022/05/22

### Fixed

- not showing icons with `--use` flag

## 0.6.0 - 2022/05/22

### Added

- prefix command with an icon, showing the source of the package manager detection

## 0.5.0 - 2022/05/21

### Added

- `SWPM` environment variable configuration to use a default package manager

## 0.4.2 - 2022/05/21

### Fixed

- [volta](https://volta.sh/) detection for `--use` flag
- add volta detection to `--info` flag

## 0.4.1 - 2022/05/20

### Fixed

- [volta](https://volta.sh/) pinned compatibility
- `--save-*` flags exclusion on `add` command

### Added

- supported shared commands to documentation

## 0.4.0 - 2022/05/20

### Added

- first version that translate commands `install` [`--frozen-lockfile`] and `add` [`--global`, `--save-dev`, `--save-exact`] commands

### Changed

- yargs refactor
- structure project reorder

## 0.3.2 - 2022/05/19

### Fixed

- version name on message

## 0.3.1 - 2022/05/19

### Changed

- tweet action to support twitter API v2

## 0.3.0 - 2022/05/19

### Added

- github action to tween on publishing

## 0.2.3 - 2022/05/18

### Changed

- options to flags

## 0.2.2 - 2022/05/18

### Fixed

- current package manager from `packageManager` property

## 0.2.1 - 2022/05/18

### Changed

- folder structure

## 0.2.0 - 2022/05/18

### Added

- add `packageManager` property to `getCurrentPackageManager` method

## 0.1.2 - 2022/05/18

### Changed

- add `engine` and `packageManager` properties

## 0.1.1 - 2022/05/18

### Fixed

- github actions
- readme commands

## 0.1.0 - 2022/05/17

### Added

- yargs middleware to preprocess the Package Manager to use
- yargs `install` and `add` commands
- `common-tags` library to stylize output messages

### Changed

- `see` option renamed to `test`
- `version` option was renamed and merged with `info` option

### Fixed

- get selected Package Manager configuration one time
- `fileExists` validation problem with `async` calls

## 0.0.5 - 2022/05/17

### Fixed

- local path with ESM
- file existing validation

## 0.0.4 - 2022/05/17

### Fixed

- get command

## 0.0.3 - 2022/05/17

### Fixed

- readme help command and link

### Changed

- social image preview
- show command with the package color

## 0.0.2 - 2022/05/16

### Added

- Icons, social and logos

## 0.0.1 - 2022/05/15

### Added

- Main project structure
- Package Manager detection
- `pin`, `use`, `get`, `see` and `info` options
- Pinned validation
