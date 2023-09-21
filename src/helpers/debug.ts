import { inspect } from 'node:util'

export const debug = (object: Object) => {
  console.log(
    inspect(
      object,
      {
        showHidden: false,
        depth: null,
        colors: true
      }
    )
  )
}
