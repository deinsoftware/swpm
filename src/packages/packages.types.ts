
export type PackageManagerList = 'pnpm' | 'npm' | 'yarn' | 'yarn@berry' | 'bun' | 'volta'

type ColorValueHex = `#${string}`

export type PackageConfiguration = {
  cmd: PackageManagerList;
  exc: string;
  color: ColorValueHex;
  url: string;
  semver: string;
  version?: string,
  lockFiles: string[];
  modulesPath: string[];
  modulesFile: string[];
  logFile: string;
  install: string;
  cmds: {
    [key: string]: string | [string, number] | string[] | { [key: string]: string | string[] }
  };
  args: {
    [key: string]: string | number | [string, number] | { [key: string]: string };
  };
};