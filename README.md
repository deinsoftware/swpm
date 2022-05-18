# Switch Package Manager

[![build](https://github.com/deinsoftware/swpm/actions/workflows/build.yml/badge.svg)](https://github.com/deinsoftware/swpm/actions/workflows/build.yml)
[![publish](https://github.com/deinsoftware/swpm/actions/workflows/publish.yml/badge.svg)](https://github.com/deinsoftware/swpm/actions/workflows/publish.yml)
[![npm-version](https://img.shields.io/npm/v/swpm.svg?color=blue)](https://www.npmjs.com/package/swpm)
[![npm-downloads](https://img.shields.io/npm/dt/swpm)](https://www.npmjs.com/package/swpm)
[![node-engine](https://img.shields.io/node/v/swpm.svg)](https://nodejs.org)
[![license](https://img.shields.io/github/license/deinsoftware/swpm)](LICENSE.md)

![swpm](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/social/preview.png)

---

## Menu

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)  
  - [Installing](#installing)
  - [Help](#help)
- [Usage](#usage)
  - [Flags](#flags)
    - [Use](#use)
    - [Pin](#pin)
    - [Test](#test)
    - [Info](#info)
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

## Usage

The `swpm` will run the command switching automatically to the pinned Package Manager.

```bash
swpm [FLAGS] <command> [--] [args]
```

### Flags

#### Use

The `swpm --use` flag allows you to choose your Package Manager for a project.

```bash
swpm --use <npm|yarn|pnpm> <command> [--] [args]
swpm -u <npm|yarn|pnpm> <command> [--] [args]
```

> It will run the command using the selected Package Manager, no matter the `swpm` property in your `package.json`.

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
swpm --test <npm|yarn|pnpm> <command> [--] [args]
swpm -t <npm|yarn|pnpm> <command> [--] [args]
```

> It will show the command using the selected Package Manager, no matter the `swpm` property in your `package.json`.

#### Info

The `swpm --info` flag show the current Package Manager used and some versions information.

```bash
swpm --info
swpm -i
```

It will search firs the `swpm` property on the `package.json` file, and if doesn't not found it, will try to infer the Package Manager in use with help of the `lock`'s file.

### Commands

#### Install

By default, will install all modules listed as dependencies in `package.json`.

```bash
swpm install
```

This command installs a package and any packages that it depends on. If the package has a `lock` file, the installation of dependencies will be driven by that.

#### Add

This command, no arguments, will add a package to local `package.json` file.

```bash
swpm add <package> [args]
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

`swpm` use three stages to infer what is the current Package Manager, following this order.

1. Search the `swpm` property on `package.json` file
1. Search the `packageManager` property on `package.json` file
1. Search for `lock`'s files

  | Lock File           | Package Manager |
  | ------------------- | --------------- |
  | `package-lock.json` | `npm`           |
  | `yarn.lock`         | `yarn`          |
  | `pnpm-lock.yaml`    | `pnpm`          |

⇧ [Back to menu](#menu)

---

## Logos and Usage

If you want to help, spread the word of `swpm` in a project or web, please this usage guide.

### Badge

[![swpm-version](https://img.shields.io/npm/v/swpm.svg?color=blue&label=swpm&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFRSURBVHgBrVO9SsNQGD2x/7VaxTbQ6lARW8GCWoR2Kzi4CA7ubs6+gE/gkzg4+ARJfADpFFycBGlMKiL5sUbTxHtv4rXYybQHvnAOl+/kOzf5EARBjZQS/B83tBcRiQtFoE8QyLIMXdcphSiKaD+/wDctppOrFfiWzXW6sYnsQTc8QwRJkqCqKuPNZhPbvXt4fY3pzH4LI8J/dP74iBvMYUpMbcAjrByeorpnM14qF1A6uUTw/sa0UMzAvG4hEUVIViuTBg8DG72nV37gf9wSg8doTAGfd0V+B4kxg9lFqJcX8MsLELK7EPLrYYSlHaQaKf7m9FZ90qBvDqGRoqgsZnE+uOC6tbYMd/4KhvPFdHto4eyvge16vEEzc4yPa88wYJCicByHTzC7O+huiGT0HONVEsFyC6RGXAudDmw7/Mz0T+WIuYl8I6lBLeZGKrT3G+NcbiaXShWYAAAAAElFTkSuQmCC)](https://www.npmjs.com/package/swpm)

```markdown
[![swpm-version](https://img.shields.io/npm/v/swpm.svg?color=blue&label=swpm&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFRSURBVHgBrVO9SsNQGD2x/7VaxTbQ6lARW8GCWoR2Kzi4CA7ubs6+gE/gkzg4+ARJfADpFFycBGlMKiL5sUbTxHtv4rXYybQHvnAOl+/kOzf5EARBjZQS/B83tBcRiQtFoE8QyLIMXdcphSiKaD+/wDctppOrFfiWzXW6sYnsQTc8QwRJkqCqKuPNZhPbvXt4fY3pzH4LI8J/dP74iBvMYUpMbcAjrByeorpnM14qF1A6uUTw/sa0UMzAvG4hEUVIViuTBg8DG72nV37gf9wSg8doTAGfd0V+B4kxg9lFqJcX8MsLELK7EPLrYYSlHaQaKf7m9FZ90qBvDqGRoqgsZnE+uOC6tbYMd/4KhvPFdHto4eyvge16vEEzc4yPa88wYJCicByHTzC7O+huiGT0HONVEsFyC6RGXAudDmw7/Mz0T+WIuYl8I6lBLeZGKrT3G+NcbiaXShWYAAAAAElFTkSuQmCC)](https://www.npmjs.com/package/swpm)
```

### Logomark

[![swpm-icon64](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/icons/icon_64.png)](https://www.npmjs.com/package/swpm)

```markdown
[![swpm-icon-64](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/icons/icon_64.png)](https://www.npmjs.com/package/swpm)
```

### Brand

[![swpm-logo](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/brand/logo.png)](https://www.npmjs.com/package/swpm)

```markdown
[![swpm-logo](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/brand/logo.png)](https://www.npmjs.com/package/swpm)
```

[![swpm-logo-color](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/brand/logo-color.png)](https://www.npmjs.com/package/swpm)

```markdown
[![swpm-logo-color](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/brand/logo-color.png)](https://www.npmjs.com/package/swpm)
```

[![swpm-img](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/brand/img.png)](https://www.npmjs.com/package/swpm)

```markdown
[![swpm-img](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/brand/img.png)](https://www.npmjs.com/package/swpm)
```

[![swpm-img-color](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/brand/img-color.png)](https://www.npmjs.com/package/swpm)

```markdown
[![swpm-img-color](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/brand/img-color.png)](https://www.npmjs.com/package/swpm)
```

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
