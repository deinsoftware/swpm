export type Repository = {
  url?: string
  provider?: string
  current?: string
  paths?: {
    pull?: string
    branch?: string
  }
}
