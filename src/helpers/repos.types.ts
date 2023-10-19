import type { ProvidersConfiguration } from '../git/providers.types.js'

export type Repository = Partial<ProvidersConfiguration> & {
  url?: `https://${string}`
  provider?: string
  current?: string
}
