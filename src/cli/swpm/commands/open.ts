import chalk from 'chalk'
import { exit, cwd } from 'node:process'
import { ArgumentsCamelCase, CommandModule } from 'yargs'
import { openBrowser, openExplorer } from '../../../helpers/open.js'
import { fileExists } from '../../../helpers/files.js'
import { getRepoUrl, gitCurrentBranch } from '../../../helpers/repos.js'

type OptionsProps = {
  'explorer'?: boolean,
  'coverage'?: boolean,
  'git-repo'?: boolean,
  'git-branch'?: boolean,
  'git-pulls'?: boolean,
  'git-compare'?: boolean,
  'npm-package'?: boolean,
  file?: string,
  path?: string,
  branch?: string
} // TODO: check how can i do this parameter on commands

const hasGitProperty = (yargs: ArgumentsCamelCase<OptionsProps>) => {
  return Object.keys(yargs).some((key) => key.startsWith('git'))
}

const clean: CommandModule<Record<string, unknown>, OptionsProps> = {
  command: 'open [FLAGS]',
  aliases: ['o'],
  describe: 'open in the file explore or browser',

  builder: (yargs) =>
    yargs
      .conflicts('open', ['add', 'install', 'remove', 'update', 'upgrade', 'clean'])
      .option('explorer', {
        type: 'boolean',
        desc: 'open path on file explorer',
        usage: '$0 open --explorer <path>',
        conflicts: ['coverage', 'git-repo', 'git-branch', 'git-pulls', 'git-compare', 'npm-package']
      })
      .option('coverage', {
        type: 'boolean',
        desc: 'open coverage report',
        usage: '$0 open --coverage <file>',
        conflicts: ['explorer', 'git-repo', 'git-branch', 'git-pulls', 'git-compare', 'npm-package']
      })
      .option('git-repo', {
        type: 'boolean',
        desc: 'browse current repo',
        usage: '$0 open --git-repo',
        conflicts: ['explorer', 'coverage', 'git-branch', 'git-pulls', 'git-compare', 'npm-package']
      })
      .option('git-branch', {
        type: 'boolean',
        desc: 'browse current branch',
        usage: '$0 open --git-branch',
        conflicts: ['explorer', 'coverage', 'git-repo', 'git-pulls', 'git-compare', 'npm-package']
      })
      .option('git-actions', {
        type: 'boolean',
        desc: 'browse actions tab',
        usage: '$0 open --git-branch',
        conflicts: ['explorer', 'coverage', 'git-repo', 'git-pulls', 'git-compare', 'npm-package']
      })
      .option('git-pulls', {
        type: 'boolean',
        desc: 'browse pull request tab',
        usage: '$0 open --git-pulls',
        conflicts: ['explorer', 'coverage', 'git-repo', 'git-branch', 'git-compare', 'npm-package']
      })
      .option('git-compare', {
        type: 'boolean',
        desc: 'browse compare current branch with another branch',
        usage: '$0 open --git-compare <branch>',
        conflicts: ['explorer', 'coverage', 'git-repo', 'git-branch', 'git-pulls', 'npm-package']
      })
      .option('npm-package', {
        type: 'boolean',
        desc: 'browse package name on npm package site',
        usage: '$0 open --npm-package',
        conflicts: ['explorer', 'coverage', 'git-repo', 'git-branch', 'git-pulls', 'git-compare']
      }),

  handler: async (yargs) => {
    console.log(`🚀 ${chalk.bold('Opening')}: `)

    if ('explorer' in yargs) {
      let path = cwd()
      if ('path' in yargs && yargs?.path) {
        path = yargs?.path
      }
      openExplorer(path)
    }

    if ('coverage' in yargs) {
      let url = yargs?.file
      if (!url) {
        url = `${cwd()}/coverage/index.html`
      }

      if (await fileExists(url)) {
        await openBrowser(url)
      } else {
        // TODO: show error
      }
    }

    if (hasGitProperty(yargs)) {
      const repoUrl = getRepoUrl()
      const currentBranch = gitCurrentBranch()

      if ('git-repo' in yargs) {
        await openBrowser(repoUrl)
      }

      if ('git-branch' in yargs) {
        const url = `${repoUrl}/tree/${currentBranch}`
        await openBrowser(url)
      }

      if ('git-actions' in yargs) {
        await openBrowser(`${repoUrl}/actions`)
      }

      if ('git-pulls' in yargs) {
        await openBrowser(`${repoUrl}/pulls`)
      }

      if ('git-compare' in yargs) {
        let baseBranch = yargs?.branch
        if (!baseBranch) {
          baseBranch = 'dev'
        }

        const url = `${repoUrl}/compare/${baseBranch}..${currentBranch}`
        await openBrowser(url)
      }
    }

    if ('npm-package' in yargs) {
      // TODO: implement getting the name from package.json
    }

    exit(0)
  }
}

export default clean
