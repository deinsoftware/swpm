import { execSync } from 'node:child_process'

export const testCommandResult = (command: string): string => {
  try {
    const child = execSync(command)
    return child.toString().trim()
  } catch (error) {
    return ''
  }
}

export const testCommandArray = (command: string): string[] => {
  try {
    const child = execSync(command)
    return child.toString().split('\n')
  } catch (error) {
    return ['']
  }
}