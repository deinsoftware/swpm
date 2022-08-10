# Switch Package Manager

[![build](https://github.com/deinsoftware/swpm/actions/workflows/build.yml/badge.svg)](https://github.com/deinsoftware/swpm/actions/workflows/build.yml)
[![publish](https://github.com/deinsoftware/swpm/actions/workflows/publish.yml/badge.svg)](https://github.com/deinsoftware/swpm/actions/workflows/publish.yml)
[![Sonar-reliability](https://sonarcloud.io/api/project_badges/measure?project=dein%3Aswpm&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=dein%3Aswpm)
[![sonar-security](https://sonarcloud.io/api/project_badges/measure?project=dein%3Aswpm&metric=security_rating)](https://sonarcloud.io/dashboard?id=dein%3Aswpm)
[![sonar-maintainability](https://sonarcloud.io/api/project_badges/measure?project=dein%3Aswpm&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=dein%3Aswpm)
[![sonar-coverage](https://sonarcloud.io/api/project_badges/measure?project=dein%3Aswpm&metric=coverage)](https://sonarcloud.io/dashboard?id=dein%3Aswpm)  
[![npm-version](https://img.shields.io/npm/v/swpm.svg?color=blue)](https://www.npmjs.com/package/swpm)
[![npm-downloads](https://img.shields.io/npm/dt/swpm)](https://www.npmjs.com/package/swpm)
[![node-engine](https://img.shields.io/node/v/swpm.svg?color=blue)](https://nodejs.org)
[![volta](https://img.shields.io/badge/%E2%9A%A1%20volta-compatible-blue)](https://volta.sh)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?color=yellow)](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)
[![license](https://img.shields.io/github/license/deinsoftware/swpm)](LICENSE.md)

![swpm](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/social/preview.png)

---

## Menu

- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Commands](#commands)
    - [Install](#install)
    - [Add](#add)
    - [Remove](#remove)
    - [Update](#update)
    - [Upgrade](#upgrade)
    - [Interactive](#interactive)
    - [Clean](#clean)
  - [Shared Commands](#shared-commands)
  - [Flags](#flags)
- [FAQ](#faq)
- [About](#about)

---

## Getting Started

When switching between JavaScript projects, it's often easy to forget which package manager should be used. JavaScript package managers aren't quite compatible either and each one resolves dependencies differently, so accidentally installing with `npm` could cause a `yarn` or `pnpm` project to break.

`swpm` is a CLI that intends to solve this problem by unifying the most used commands for the most common Node Package Managers into one. It will recognize the Package Manager used on the project and automatically will translate those commands.

This is an example of how #swpm works. The same command, no matter the package manager used on the project.

![swpm-example](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/social/example.png)

> **Note**:  
> We will start with most used command, then other commands will be added gradually.  
> Track the command progress implementation on [CHEATSHEET](CHEATSHEET.md)

### Prerequisites

What things you need to install?

- [node.js](https://nodejs.org)

### Installing

Install as global with any of this package managers

| Package Manager | Install Command |
| --------------- | --------------- |
| npm  | `npm install swpm --location=global` |
| yarn | `yarn global add swpm` |
| pnpm | `pnpm install swpm --global` |

### Help

With `swpm --help` it will show a command help resume.

```text
swpm [<command>] [--] [args] [FLAGS]

Commands:
  swpm install [FLAGS]                   install packages from package.json
                                                                    [aliases: i]
  swpm add <package> [args] [FLAGS]      add package                [aliases: a]
  swpm remove <package> [args] [FLAGS]   remove package
                                                 [aliases: r, rm, uninstall, un]
  swpm update <package> [args] [FLAGS]   update package        [aliases: up, ud]
  swpm upgrade <package> [args] [FLAGS]  upgrade package to latest [aliases: ug]
  swpm interactive [FLAGS]               update packages interactive
                                                                   [aliases: ui]
  swpm clean [FLAGS]                     clean packages             [aliases: c]

Options:
  -u, --use   use a package manager             [choices: "npm", "yarn", "pnpm"]
  -p, --pin   pin a package manager             [choices: "npm", "yarn", "pnpm"]
  -t, --test  test command (without running)    [choices: "npm", "yarn", "pnpm"]
      --info  show information and versions                            [boolean]
      --help  Show help                                                [boolean]
```

⇧ [Back to menu](#menu)

---

## Usage

The `swpm` will run the command switching automatically to the pinned Package Manager.

```bash
swpm <command> [--] [args] [FLAGS]
```

### Commands

#### Install

By default, will install all modules listed as dependencies in `package.json`.

```bash
swpm install [args] [FLAGS]
```

> Alias: `i`

This command installs a package and any packages that it depends on. If the package has a `lock` file, the installation of dependencies will be driven by that.

| Args                | Alias | Description                                                                   |
| ------------------- | ----- | ----------------------------------------------------------------------------- |
| `--frozen-lockfile` | `-FL` | install dependencies from lock file (without updating it). Also known as `ci` |

#### Add

This command, no arguments, will add a package to local `package.json` file. Package will appear as **dependencies** by default.

```bash
swpm add <package> [args] [FLAGS]
```

> Alias: `a`

`swpm add <package>` saves any specified packages into dependencies by default. Additionally, you can control where and how they get saved with some additional flags:

| Args              | Alias | Description                                                                                           |
| ----------------- | ----- | ----------------------------------------------------------------------------------------------------- |
| `--save-dev`      | `-D`  | Package will appear in **devDependencies**                                                            |
| `--save-optional` | `-O`  | Package will appear in **optionalDependencies**                                                       |
| `--save-peer`     |       | Package will appear in **peerDependencies**                                                           |
| `--save-exact`    | `-E`  | Dependencies will be configured with an exact version rather than using default semver range operator |
| `--global`        | `-g`  | Remove the current package context as a global package                                                |

#### Remove

This command, no arguments, will remove a package to local `package.json` file. Package will be removed as **dependencies** by default.

```bash
swpm remove <package> [args] [FLAGS]
```

> Aliases: `r`, `rm`, `uninstall`, `un`

| Args              | Alias | Description                                            |
| ----------------- | ----- | ------------------------------------------------------ |
| `--save-dev`      | `-D`  | Package will be removed from **devDependencies**       |
| `--save-optional` | `-O`  | Package will be removed from **optionalDependencies**  |
| `--save-peer`     |       | Package will be removed from **peerDependencies**      |
| `--global`        | `-g`  | Remove the current package context as a global package |

#### Update

This command will update all the packages listed to the latest version (specified by the `tag` config), respecting the semver constraints of both your package and its dependencies (if they also require the same package). It will also install missing packages.

```bash
swpm update [<package>] [args] [FLAGS]
```

> Aliases: `up`, `ud`

| Args              | Alias | Description                                                                                           |
| ----------------- | ----- | ----------------------------------------------------------------------------------------------------- |
| `--global`        | `-g`  | Remove the current package context as a global package                                                |

> It will not made modifications on `package.json` file

#### Upgrade

This command will upgrade the packages to the latest version, ignoring ranges specified in `package.json`.

```bash
swpm upgrade <package> [args] [FLAGS]
```

> Alias: `ug`

| Args              | Alias | Description                                                                                           |
| ----------------- | ----- | ----------------------------------------------------------------------------------------------------- |
| `--save-exact`    | `-E`  | Dependencies will be configured with an exact version rather than using default semver range operator |
| `--global`        | `-g`  | Remove the current package context as a global package                                                |

> It will save new version on `package.json` file

#### Interactive

Show outdated dependencies and select which ones to upgrade.

```bash
swpm interactive [FLAGS]
```

> Alias: `ui`

| Args              | Alias | Description                                                           |
| ----------------- | ----- | --------------------------------------------------------------------- |
| `--latest`        | `-L`  | Updates all dependencies, ignoring ranges specified in `package.json` |
| `--global`        | `-g`  | Remove the current package context as a global package                |

> **Note**:  
> Sadly, this command is not available on **npm** Package Manager.

#### Clean

This command does not exist in the package managers, but is one of the most repetitive tasks, deleting files.

```bash
swpm clean [args]
```

> Alias: `c`

| Args              | Alias | Description                     |
| ----------------- | ----- | ------------------------------- |
| `--node-modules`  |       | Delete **node_modules** folder  |
| `--lock`          |       | Delete **lock** files           |
| `--log`           |       | Delete **log** files            |
| `--build`         |       | Delete **build** folder         |
| `--coverage`      |       | Delete **coverage** folder      |
| `--all`           |       | Run all args                    |

⇧ [Back to menu](#menu)

---

### Shared Commands

There are commands that don't need the `swpm` translation tool, because share the same structure as all package managers.

#### Init

`init` or `create` can be used to set up a new or existing package.

```bash
swpm init [<name> --yes]
swpm create [<name> --yes]
```

> To run these commands in a path where a `package.json` didn't exist add the flag `--use <npm|yarn|pnpm>` at the end or setup an `SWPM` environment variable.

#### Login/Logout

Login and logout to [https://www.npmjs.com/](https://www.npmjs.com/).  
Commonly used when you need to publish or admin packages.

```bash
swpm login
swpm logout
```

> To run these commands in a path where a `package.json` didn't exist add the flag `--use <npm|yarn|pnpm>` at the end or setup an `SWPM` environment variable.

#### Scripts

This runs an arbitrary command from a package's "scripts" object.  
If no "command" is provided, it will list the available scripts.  

```bash
swpm run <command> [-- <args>]
swpm test
swpm build
```

> You can run `test` and `build` "scripts" without the `run` prefix.

#### Publish

Commands to `publish`, `unpublish` or `deprecate` a package on [https://www.npmjs.com/](https://www.npmjs.com/).

```bash
swpm publish
swpm unpublish <package>
swpm deprecate <package> <message>
```

#### Config

See the local configuration, or setup default values.

```bash
swpm config list
swpm config set <key> <value>
```

Example:

```bash
swpm config set save-exact true
swpm config set save-prefix '~'
```

> To run these commands in a path where a `package.json` didn't exist add the flag `--use <npm|yarn|pnpm>` at the end.

#### Versions

`outdated` will check the registry to see if any (or, specific) installed packages are currently outdated.

```bash
swpm outdated [<package>] [--global]
```

> To run this commands in a path where a `package.json` didn't exist with flag `--global` add the flag `--use <npm|yarn|pnpm>` at the end or setup an `SWPM` environment variable.

⇧ [Back to menu](#menu)

---

### Flags

Flags are important to `swpm` because can modify or set his behavior.

#### Use

The `swpm --use` flag allows you to choose your Package Manager for a project.

```bash
swpm <command> [--] [args] --use <npm|yarn|pnpm>
swpm <command> [--] [args] --u <npm|yarn|pnpm>
```

It will run the command using the selected Package Manager, no matter the `swpm` property in your `package.json`.

> In order to avoid the `--use` flag on paths where no exist a `package.json` can set a **global** package manager creating an `SWPM` environment variable with one of this values `<npm|yarn|pnpm>`.

| OS    | Command                                                   |
| ----- | --------------------------------------------------------- |
| win   | `setx SWPM "<npm\|yarn\|pnpm>"`                           |
| macOS | `echo 'export SWPM="npm"' >> <~/.bash_profile\|~/.zshrc>` |
| linux | `echo 'export SWPM="npm"' >> <~/.bash_profile\|~/.zshrc>` |

#### Pin

The `swpm --pin` flag allows you to choose your Package Manager for a project.

```bash
swpm --pin <npm|yarn|pnpm>
swpm -p <npm|yarn|pnpm>
```

It will store the pinned Package Manager in the `package.json` file, so you can commit your choice of tools to version control:

```diff
{
+ "swpm": "<package-manager-name>"
}
```

> You also can set it manually. Just take care writing a valid Package Manager: `npm`, `yarn` or `pnpm`.

#### Test

The `swpm --test` flag show the equivalent command using the selected Package Manager, but **it will not run the command**

```bash
swpm <command> [--] [args] --test <npm|yarn|pnpm> 
swpm <command> [--] [args] -t <npm|yarn|pnpm>
```

It will show the command using the selected Package Manager, no matter the `swpm` property in your `package.json`.

#### Info

The `swpm --info` flag show the current Package Manager used and some versions information.

```bash
swpm --info
```

It will search firs the `swpm` property on the `package.json` file, and if doesn't not found it, will try to infer the Package Manager in use with help of the `lock`'s file.

⇧ [Back to menu](#menu)

---

## FAQ

### How infer the Package Manager?

`swpm` search some characteristics following this order.

| Icon | Stage    |
| :--: | ------------------------------------------------------------ |
| 📌   | Search the `swpm` property pinned on `package.json` file     |
| 📦   | Search the `packageManager` property on `package.json` file  |
| 🌐   | Search a `SWPM` environment variable                         |
| 🔒   | Search for a `lock` file                                     |

### What can I use as Package parameter?

The `<package>` parameter should follow one of these structures:

```bash
[<@scope>/]<name>
[<@scope>/]<name>@<tag>
[<@scope>/]<name>@<version>
[<@scope>/]<name>@<version range>
<alias>@npm:<name>
<git-host>:<git-user>/<repo-name>
<git repo url>
<tarball file>
<tarball url>
<folder>
```

### Non documented commands

`swpm` is not restrictive, if a command translations was not included yet, you can write the command as the package manager expect, then `swpm` will try to infer the package manager and preserve the rest of the command and arguments without changes and run them.

But, if you found one of this cases, please open a [command compatibility](https://github.com/deinsoftware/swpm/issues/new?assignees=&labels=command-request&template=command-compatibility.md&title=) issue.

⇧ [Back to menu](#menu)

---

## About

### Built With

- [VS Code](https://code.visualstudio.com/) - Code editing redefined.
- [WSL](https://docs.microsoft.com/en-us/windows/wsl/) - Windows Subsystem for Linux.
- [Windows Terminal](https://github.com/Microsoft/Terminal/) - A modern terminal application for users of command-line tools and shells.
- [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Chalk](https://github.com/chalk/chalk) - Terminal string styling done right.
- [Yargs](https://yargs.js.org/) - Yargs be a node.js library fer hearties tryin' ter parse optstrings.
- [common-tags](https://www.npmjs.com/package/common-tags) - A set of well-tested, commonly used template literal tag functions for use in ES2015+.
- [update-notifier](https://www.npmjs.com/package/update-notifier) - Update notifications for your CLI app.
- [ESLint](https://eslint.org/) - Find and fix problems in your JavaScript code.
- [vitest](https://vitest.dev/) - A blazing fast unit-test framework powered by Vite ⚡️.

### Contributing

Please read [CONTRIBUTING](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

### Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [swpm](https://github.com/deinsoftware/swpm/tags) on GitHub.

### Brand

If you want to help, spread the word of `swpm` in a project or web, please use this [BRAND](BRAND.md)'s images.

### Authors

- **Camilo Martinez** [[Equiman](http://github.com/equiman)]

See also the list of [contributors](https://github.com/deinsoftware/swpm/contributors) who participated in this project.

### Sponsors

If this project helps you, consider buying me a cup of coffee.

[![paypal](https://img.shields.io/badge/-PayPal-gray?style=flat&labelColor=00457C&logo=paypal&logoColor=white&link=https://paypal.me/equiman/3)](https://paypal.me/equiman/3)
[![ko-fi](https://img.shields.io/badge/-Ko–Fi-gray?style=flat&labelColor=fd444a&logo=ko-fi&logoColor=white&link=https://ko-fi.com/equiman)](https://ko-fi.com/equiman)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

⇧ [Back to menu](#menu)
