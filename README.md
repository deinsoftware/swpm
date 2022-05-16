# Switch Package Manager

When switching between JavaScript projects, it's often easy to forget which package manager should be used. JavaScript package managers aren't quite compatible either and each one resolves dependencies differently, so accidentally installing with `npm` could cause a `yarn` or `pnpm` project to break.

`swpm` intend to solve this problem unifying the commands for the most common Node Package Managers into one. It will recognize the Package Manager used on the project and automatically will translate those commands.

> WIP: we will start with most used command, then other commands will be added gradually.

## Install

```bash
npm install --global swpm
yarn global add swpm
pnpm install -global swpm 
```

## Commands

With `swpm --help` it will show a command help resume.

```bash
swpm --help
Options:
  -p, --pin      pin a package manager          [choices: "npm", "yarn", "pnpm"]
  -u, --use      use a package manager          [choices: "npm", "yarn", "pnpm"]
  -s, --see      show equivalent command        [choices: "npm", "yarn", "pnpm"]
  -g, --get      get current package manager
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
```

### Pinning

The `swpm --pin` command allows you to choose your Package Manager for a project.

```bash
swpm --pin <npm|yarn|pnpm>
swpm -p <npm|yarn|pnpm>
```

It will store this in your `package.json` so you can commit your choice of tools to version control:

```diff
{
+ "swpm": "<package-manager-name>"
}
```

You also can set it manually.

### Use

The `swpm --use` command allows you to choose your Package Manager for a project.

```bash
swpm --use <npm|yarn|pnpm> [args]
swpm -u <npm|yarn|pnpm> [args]
```

It will run a command using the selected Package Manager, no matter the `swpm` property in your `package.json`.

### Show

The `swpm --show` command show the equivalent command using the selected Package Manager. **It will not run the command**

```bash
swpm --show <npm|yarn|pnpm> [options]
swpm -s <npm|yarn|pnpm> [options]
```

It will run a command using the selected Package Manager, no matter the `swpm` property in your `package.json`.

### Get

The `swpm --get` command show the current Package Manager used in the project.

```bash
swpm --get
swpm -g
```

It will search firs the `swpm` property on the `package.json` file, and if doesn't not found it, will try to infer the Package Manager in use with help of the `lock`'s file.

### Run

The `swpm` command will run the command switching automatically to the pinned Package Manager.

```bash
swpm [args]
```

> Work In Progress

---

## About

### Built With

* [VS Code](https://code.visualstudio.com/) - Code editing redefined.
* [WSL](https://docs.microsoft.com/en-us/windows/wsl/) - Windows Subsystem for Linux.
* [Widows Terminal](https://github.com/Microsoft/Terminal/) - A modern terminal application for users of command-line tools and shells.

### Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [swpm](https://github.com/deinsoftware/swpm/tags) on GitHub.

### Authors

* **Camilo Martinez** [[Equiman](http://github.com/equiman)]

See also the list of [contributors](https://github.com/deinsoftware/swpm/contributors) who participated in this project.

### Sponsors

If this project helps you, consider buying me a cup of coffee.

[![paypal](https://img.shields.io/badge/-PayPal-gray?style=flat&labelColor=00457C&logo=paypal&logoColor=white&link=https://paypal.me/equiman/3)](https://paypal.me/equiman/3)
[![patreon](https://img.shields.io/badge/-Patreon-gray?style=flat&labelColor=052d49&logo=patreon&logoColor=F96854&link=https://patreon.com/equiman)](https://patreon.com/equiman)
[![buymeacoffee](https://img.shields.io/badge/-Buy%20Me%20A%20Coffee-gray?style=flat&labelColor=FF813F&logo=buy-me-a-coffee&logoColor=white&link=https://buymeacoff.ee/equiman)](https://www.buymeacoffee.com/equiman)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
