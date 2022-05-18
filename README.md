# Switch Package Manager

[![build](https://github.com/deinsoftware/swpm/actions/workflows/build.yml/badge.svg)](https://github.com/deinsoftware/swpm/actions/workflows/build.yml)
[![publish](https://github.com/deinsoftware/swpm/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/deinsoftware/swpm/actions/workflows/publish.yml)
[![npm-version](https://badge.fury.io/js/swpm.svg)](https://badge.fury.io/js/swpm)
[![license](https://img.shields.io/github/license/deinsoftware/swpm)](LICENSE.md)

![swpm](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/social/preview.png)

---

## Menu

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)  
  - [Installing](#installing)
  - [Help](#help)  
- [Options](#options)
  - [Use](#use)
  - [Pin](#pin)
  - [Test](#test)
  - [Info](#info)
  - [Run](#run)
- [Commands](#commands)
  - [Install](#install)
  - [Add](#add)
- [FAQ](#faq)
- [About](#about)
  - [Built With](#built-with)
  - [Contributing](#contributing)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [Sponsors](#sponsors)
  - [License](#license)

---

## Getting Started

When switching between JavaScript projects, it's often easy to forget which package manager should be used. JavaScript package managers aren't quite compatible either and each one resolves dependencies differently, so accidentally installing with `npm` could cause a `yarn` or `pnpm` project to break.

`swpm` intend to solve this problem unifying the most used commands for the most common Node Package Managers into one. It will recognize the Package Manager used on the project and automatically will translate those commands.

> WIP: we will start with most used command, then other commands will be added gradually.

### Prerequisites

What things you need to install?

- [node.js](https://nodejs.org)

### Installing

```bash
npm install --global swpm
yarn global add swpm
pnpm install -global swpm 
```

### Help

With `swpm --help` it will show a command help resume.

```text
Commands:
  swpm install        install packages from package.json            [aliases: i]
  swpm add <package>  add package                                   [aliases: a]

Options:
  -d, --debug  debug yargs parameters                 [boolean] [default: false]
  -u, --use    use a package manager            [choices: "npm", "yarn", "pnpm"]
  -p, --pin    pin a package manager            [choices: "npm", "yarn", "pnpm"]
  -t, --test   test command (without running)   [choices: "npm", "yarn", "pnpm"]
      --info   show information and versions                           [boolean]
      --help   Show help                                               [boolean]
```

⇧ [Back to menu](#menu)

---

## Options

### Use

The `swpm --use` option allows you to choose your Package Manager for a project.

```bash
swpm --use <npm|yarn|pnpm> [args]
swpm -u <npm|yarn|pnpm> [args]
```

> It will run the command using the selected Package Manager, no matter the `swpm` property in your `package.json`.

### Pin

The `swpm --pin` option allows you to choose your Package Manager for a project.

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

### Test

The `swpm --test` option show the equivalent command using the selected Package Manager. **It will not run the command**

```bash
swpm --test <npm|yarn|pnpm> [options]
swpm -t <npm|yarn|pnpm> [options]
```

> It will show the command using the selected Package Manager, no matter the `swpm` property in your `package.json`.

### Info

The `swpm --info` option show the current Package Manager used and some versions information.

```bash
swpm --info
swpm -i
```

It will search firs the `swpm` property on the `package.json` file, and if doesn't not found it, will try to infer the Package Manager in use with help of the `lock`'s file.

### Run

The `swpm` command will run the command switching automatically to the pinned Package Manager.

```bash
swpm [args]
```

⇧ [Back to menu](#menu)

---

## Commands

### Install

By default, will install all modules listed as dependencies in `package.json`.

```bash
swpm install
```

This command installs a package and any packages that it depends on. If the package has a `lock` file, the installation of dependencies will be driven by that.

### Add

This command, no arguments, will add a package to local `package.json` file. 

```bash
swpm add <package> [--save-dev --global]
```

`swpm add <package>` saves any specified packages into dependencies by default. Additionally, you can control where and how they get saved with some additional flags:

| Option       | Alias | Description |
| ------------ | ----- | ----------- |
| `--save-dev` | `-D`  | Package will appear in your **devDependencies** |
| `--global`   | `-g`  | installs the current package context as a global package |

⇧ [Back to menu](#menu)

---

## FAQ

### How knows?

`swpm` use two stages to infer what is the current Package Manager, following this order.

1. Search the `swpm` property on the `package.json` file
1. Search for `lock`'s files.

| Lock File           | Package Manager |
| ------------------- | --------------- |
| `package-lock.json` | `npm`           |
| `yarn.lock`         | `yarn`          |
| `pnpm-lock.yaml`    | `pnpm`          |

⇧ [Back to menu](#menu)

---

## About

### Built With

- [VS Code](https://code.visualstudio.com/) - Code editing redefined.
- [WSL](https://docs.microsoft.com/en-us/windows/wsl/) - Windows Subsystem for Linux.
- [Widows Terminal](https://github.com/Microsoft/Terminal/) - A modern terminal application for users of command-line tools and shells.
- [Chalk](https://github.com/chalk/chalk) - Terminal string styling done right
- [Yargs](https://yargs.js.org/) - Yargs be a node.js library fer hearties tryin' ter parse optstrings
- [common-tags](https://www.npmjs.com/package/common-tags) - A set of well-tested, commonly used template literal tag functions for use in ES2015+

### Contributing

Please read [CONTRIBUTING](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

### Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [swpm](https://github.com/deinsoftware/swpm/tags) on GitHub.

### Authors

- **Camilo Martinez** [[Equiman](http://github.com/equiman)]

See also the list of [contributors](https://github.com/deinsoftware/swpm/contributors) who participated in this project.

### Sponsors

If this project helps you, consider buying me a cup of coffee.

[![paypal](https://img.shields.io/badge/-PayPal-gray?style=flat&labelColor=00457C&logo=paypal&logoColor=white&link=https://paypal.me/equiman/3)](https://paypal.me/equiman/3)
[![patreon](https://img.shields.io/badge/-Patreon-gray?style=flat&labelColor=052d49&logo=patreon&logoColor=F96854&link=https://patreon.com/equiman)](https://patreon.com/equiman)
[![buymeacoffee](https://img.shields.io/badge/-Buy%20Me%20A%20Coffee-gray?style=flat&labelColor=FF813F&logo=buy-me-a-coffee&logoColor=white&link=https://buymeacoff.ee/equiman)](https://www.buymeacoffee.com/equiman)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

⇧ [Back to menu](#menu)
