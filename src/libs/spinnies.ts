import Spinnies from 'spinnies'

const spinner = {
  interval: 50,
  frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
}

const options: Partial<Spinnies.Options> = {
  succeedColor: 'green',
  failColor: 'red',
  spinner
}
export const spinnies = new Spinnies(options)
