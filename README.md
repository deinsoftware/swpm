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
- [Usage](#usage)
- [FAQ](#faq)
- [Brand](#brand)
- [About](#about)

---

## Getting Started

When switching between JavaScript projects, it's often easy to forget which package manager should be used. JavaScript package managers aren't quite compatible either and each one resolves dependencies differently, so accidentally installing with `npm` could cause a `yarn` or `pnpm` project to break.

`swpm` is a CLI that intends to solve this problem by unifying the most used commands for the most common Node Package Managers into one. It will recognize the Package Manager used on the project and automatically will translate those commands.

This is an example of how #swpm works. The same command, no matter the package manager used on the project.

![swpm-example](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/social/example.png)

> **Note**:  
> We will start with most used command, then other commands will be added gradually.  
> Track the project progress on [CHEATSHEET](CHEATSHEET.md)

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
swpm [<command>] [--] [args] [FLAGS]

Commands:
  swpm install [FLAGS]        install packages from package.json    [aliases: i]
  swpm add <package> [FLAGS]  add package                           [aliases: a]

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
swpm install [args]
swpm i [args]
```

This command installs a package and any packages that it depends on. If the package has a `lock` file, the installation of dependencies will be driven by that.

| Args                | Alias | Description |
| ------------------- | ----- | ----------- |
| `--frozen-lockfile` | `-FL` | install dependencies from lock file (without updating it). Also known as `ci` |

#### Add

This command, no arguments, will add a package to local `package.json` file.

```bash
swpm add <package> [args]
swpm a <package> [args]
```

`swpm add <package>` saves any specified packages into dependencies by default. Additionally, you can control where and how they get saved with some additional flags:

| Args           | Alias | Description |
| -------------- | ----- | ----------- |
| `--save-dev`   | `-D`  | Package will appear in your **devDependencies** |
| `--save-exact` | `-E`  | Dependencies will be configured with an exact version rather than using default semver range operator. |
| `--global`     | `-g`  | installs the current package context as a global package |

### Flags

#### Use

The `swpm --use` flag allows you to choose your Package Manager for a project.

```bash
swpm <command> [--] [args] --use <npm|yarn|pnpm>
swpm <command> [--] [args] --u <npm|yarn|pnpm>
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
swpm <command> [--] [args] --test <npm|yarn|pnpm> 
swpm <command> [--] [args] -t <npm|yarn|pnpm>
```

> It will show the command using the selected Package Manager, no matter the `swpm` property in your `package.json`.

#### Info

The `swpm --info` flag show the current Package Manager used and some versions information.

```bash
swpm --info
swpm -i
```

It will search firs the `swpm` property on the `package.json` file, and if doesn't not found it, will try to infer the Package Manager in use with help of the `lock`'s file.

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

### Package

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

⇧ [Back to menu](#menu)

---

## Brand

If you want to help, spread the word of `swpm` in a project or web, please use this brand's images.

### Badge

[![swpm-version](https://img.shields.io/npm/v/swpm.svg?color=blue&label=swpm&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALGSURBVHgB7Zu/a1NRFMe/75mQWkwMHYKtijEiggRsihCXapO1YOrmquLipIubOPgHiJMOwR+gEKckIDim4uJgayQZLFWMUJpBbWMSrNomz3viS7GB+t69dknO/cBJHi/nEu733R/vHO4xsA2WZY2Lr5SwKWF0HUR/URNWtO2OYRgVV61Ex8PCstbg8UBYuLe/Rk/n6UkX0H9P2y0VYefEaCh2b2wKYHf+DXgQ64pg0oc9NLLgQ6E7HUz7xk1hYfCBpvhtujBsJT6CJzEaAVfBlxkS4AT4coamwCoctr1yuQwVotEorEYDvxYWoYLv5ARay1VsCJPF9PvhPXbUya1GAlhOXqlUCirk83n8fD2Pz5euQBbP2Cj2Pc+ifjeN+r00ZBk+O42RWzcc/UwwRwsA5mgBwBwtAJijBQBztABgDnsBPG6cQqEQVDH9ezqBjSy77DZmwK/Unv7XDa6iwUHG1QiYuf8SKuQuTqL9ZRYbcxcgizEchneygObjp2g+yUCWocRpBK9fc/RzJUC1vob/wfr+CfL8ydi3RUJFJSHSbjRd+eldAMzRAoA5WgAwRwsA5mgBwBwtAJjjKhyeX1qBChMHRoD1GtrfitJtDW8Qxt7xTiDUUgiGKJ/gJo/gKhqcW1qFCiRAdc2HZ+8PQha/z4PzMeDdyleUFhcgS6S1jvhOCZB+9QEqXD51BMv1H0rtRwO7hQCHUCqVkMnI5wOSySTi8bijn14EwRwtAJijBQBztABgjhYAzNECgDkUDFF11T8PS08f3w9VxgJDSu0pGiQikUgnsJGFDmq7oHNYmoqkpsCTWZoCL8CXtwazarFeDpt2+VgO/HhI1aSdUwh24RSNgkEtmOylIiyxKQDBunCSsG+INGRHnUGFtvzY36WzW16E7B8Swh5h8KB1bkvnCWM7b3tdoJpCKqvr5/J52uZzvR3v8hs7DqRDLN1oWgAAAABJRU5ErkJggg==)](https://www.npmjs.com/package/swpm)

```markdown
[![swpm-version](https://img.shields.io/npm/v/swpm.svg?color=blue&label=swpm&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALGSURBVHgB7Zu/a1NRFMe/75mQWkwMHYKtijEiggRsihCXapO1YOrmquLipIubOPgHiJMOwR+gEKckIDim4uJgayQZLFWMUJpBbWMSrNomz3viS7GB+t69dknO/cBJHi/nEu733R/vHO4xsA2WZY2Lr5SwKWF0HUR/URNWtO2OYRgVV61Ex8PCstbg8UBYuLe/Rk/n6UkX0H9P2y0VYefEaCh2b2wKYHf+DXgQ64pg0oc9NLLgQ6E7HUz7xk1hYfCBpvhtujBsJT6CJzEaAVfBlxkS4AT4coamwCoctr1yuQwVotEorEYDvxYWoYLv5ARay1VsCJPF9PvhPXbUya1GAlhOXqlUCirk83n8fD2Pz5euQBbP2Cj2Pc+ifjeN+r00ZBk+O42RWzcc/UwwRwsA5mgBwBwtAJijBQBztABgDnsBPG6cQqEQVDH9ezqBjSy77DZmwK/Unv7XDa6iwUHG1QiYuf8SKuQuTqL9ZRYbcxcgizEchneygObjp2g+yUCWocRpBK9fc/RzJUC1vob/wfr+CfL8ydi3RUJFJSHSbjRd+eldAMzRAoA5WgAwRwsA5mgBwBwtAJjjKhyeX1qBChMHRoD1GtrfitJtDW8Qxt7xTiDUUgiGKJ/gJo/gKhqcW1qFCiRAdc2HZ+8PQha/z4PzMeDdyleUFhcgS6S1jvhOCZB+9QEqXD51BMv1H0rtRwO7hQCHUCqVkMnI5wOSySTi8bijn14EwRwtAJijBQBztABgjhYAzNECgDkUDFF11T8PS08f3w9VxgJDSu0pGiQikUgnsJGFDmq7oHNYmoqkpsCTWZoCL8CXtwazarFeDpt2+VgO/HhI1aSdUwh24RSNgkEtmOylIiyxKQDBunCSsG+INGRHnUGFtvzY36WzW16E7B8Swh5h8KB1bkvnCWM7b3tdoJpCKqvr5/J52uZzvR3v8hs7DqRDLN1oWgAAAABJRU5ErkJggg==)](https://www.npmjs.com/package/swpm)
```

### Logomark

[![swpm-icon64](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/icons/icon_64.png)](https://www.npmjs.com/package/swpm)

```markdown
[![swpm-icon-64](https://raw.githubusercontent.com/deinsoftware/swpm/main/.github/icons/icon_64.png)](https://www.npmjs.com/package/swpm)
```

### Logos

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
