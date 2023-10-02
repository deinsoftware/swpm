export type Providers = 'github' | 'gitlab' | 'bitbucket'

export type ProvidersConfiguration = {
    id: Providers
    paths: {
        pull: string
        branch: string
        ci: string
        diff: string
    }
}
