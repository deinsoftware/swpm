# Switch Package Manager

`swpm` is a project to unify the command for the most common Node Package Managers, and it will translate automatically into the current package manager used.
We will start with most used command and the idea is extend it to include all commands.

## Install

```bash
npm install --global swpm
yarn global add swpm
pnpm install -global swpm 
```

### Package Manager

You can set the desired package manager to use in a project adding a `swpm` property with one of the supported package managers `npm`, `yarn`, `pnpm`

```diff
{
+ "swpm": "<package-name>"
}
```

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
