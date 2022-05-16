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

### Pinning Package Manager

The `swpm pin` command allows you to choose your Package Manager for a project.

```bash
swpm pin <npm|yarn|pnpm>
```

It will stor this in your `package.json` so you can commit your choice of tools to version control:

```diff
{
+ "swpm": "<package-manager-name>"
}
```

### Automatic Discovery

You can set the desired package manager to use in a project adding a `swpm` property with one of the supported package managers `npm`, `yarn`, `pnpm`
But if the `package.json` doesn't have this property, it will try to infer the Package Manager in use, with help of the `lock` file.

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
