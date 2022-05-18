# CLI Packages

This is a cheat sheet that you can use as a handy reference for [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) and [pnpm](https://pnpm.io/) commands.

> Note: `<package>` follow this structure `<package[@latest|@#.#.#]>`

## Package Commands

| command                                | npm                                          | yarn                                            | pnpm                                            |
| -------------------------------------- | -------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| clean cache                            | `npm cache clean`                            | `yarn cache clean`                              |                                                 |
| install from `package.json`            | `npm install`                                | `yarn [install]`                                | `pnpm install`                                  |
| don't read or generate a lockfile.     | `npm install --no-package-lock`              | `yarn install --no-lockfile`                    |                                                 |
| don't generate a lockfile.             |                                              | `yarn install --pure-lockfile`                  |                                                 |
| lockfile is not updated                |                                              | `yarn install --frozen-lockfile`                | `pnpm install --frozen-lockfile`                |
| add package                            | `npm install <package> [--global]`           | `yarn [global] add <package>`                   | `pnpm add <package> [--global]`                 |
| add package as `dependencies`          | `npm install <package> [--save-prod]`        | `yarn add <package>`                            | `pnpm add <package> --save-prod`                |
| add package as `peerDependencies`      |                                              | `yarn add <package> --peer`                     | `pnpm add <package> --save-peer`                |
| add package as `devDependencies`       | `npm install <package> --save-dev`           | `yarn add <package> --dev`                      | `pnpm add <package> --save-dev`                 |
| add package as `optionalDependencies`  | `npm install <package> --save-optional`      | `yarn add <package> --optional`                 | `pnpm add <package> --save-optional`            |
| add exact version                      | `npm install <package> --save-exact`         | `yarn add <package> --exact`                    | `pnpm add <package> --save-exact`               |
| uninstall package                      | `npm uninstall <package> [--global]`         | `yarn [global] remove <package>`                | `pnpm uninstall <package> [--global]`           |
| update package                         | `npm update [<package>] [--global]`          | `yarn [global] upgrade [<package>] [--latest]`  | `pnpm update [<package>] [--latest] [--global]` |
| update interactive                     | `npx npm-check -u`                           | `yarn upgrade-interactive`                      | `pnpm update --interactive`                     |
| link local package                     | `npm link [<dir>]`                           | `yarn link [<dir>]`                             | `pnpm link [<dir>]`                             |
| unlink local package                   | `npm unlink [<package>]`                     | `yarn unlink [<package>]`                       | `pnpm unlink [<package>]`                       |
| list all package at the top level      | `npm list --depth 0`                         | `yarn list --depth 0`                           | `pnpm list --depth 0`                           |
| audit vulnerable dependencies          | `npm audit [fix]`                            | `yarn audit [fix]`                              | `pnpm audit [fix]`                              |
| list outdated packages                 | `npm outdated`                               | `yarn outdated`                                 | `pnpm outdated`                                 |

## Shared Commands

Use the same command structure between package managers.

| command                                | npm                                          | yarn                                            | pnpm                                            |
| -------------------------------------- | -------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| init                                   | `npm init`                                   | `yarn init`                                     | `pnpm init`                                     |
| login/logout                           | `npm <login\|logout>`                        | `yarn <login\|logout>`                          | `pnpm <login\|logout>`                          |
| run scripts                            | `npm run <script>`                           | `yarn run <script>`                             | `pnpm [run] <script>`                           |
| run test                               | `npm test`                                   | `yarn test`                                     | `pnpm test`                                     |
| crate bundle package                   | `npm build`                                  | `yarn build`                                    | `pnpm build`                                    |
| publish                                | `npm publish`                                | `yarn publish`                                  | `pnpm publish`                                  |
| unpublish                              | `npm unpublish <package>[@#.#.#]`            | `yarn unpublish <package>[@#.#.#]`              | `pnpm unpublish <package>[@#.#.#]`              |
| deprecate                              | `npm deprecate <package>[@#.#.#] <message>`  | `yarn deprecate <package>[@#.#.#] <message>`    | `pnpm deprecate <package>[@#.#.#] <message>`    |
| config list                            | `npm config list`                            | `yarn config list`                              | `pnpm config list`                              |
| config `--save-default` as default     | `npm config set save-exact true`             | `yarn config set save-exact true`               | `pnpm config set save-exact true`               |
| config `~` as default instead `^`      | `npm config set save-prefix '~'`             | `yarn config set save-prefix '~'`               | `pnpm config set save-prefix '~'`               |

## Run Remotely

Run a command without installing it.

| command                                | npm                                          | yarn                                            | pnpm                                            |
| -------------------------------------- | -------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| run package                            | `npx <package>`                              | `yarn dlx <package>`                            | `pnpm dlx <package>`                            |

---

## CLI documentation

- [npm](https://docs.npmjs.com/cli/v8/commands)
- [yarn](https://classic.yarnpkg.com/en/docs/cli/)
- [pnpm](https://pnpm.io/cli/install)
