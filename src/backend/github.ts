import {
    Backend,
    URLMatchError
} from './backend.ts'


export class GithubBackend extends Backend {

    provider = 'github'

    // [user]/[repo]@[tag]/[file/mod.ts]
    // [user]@github/[repo]@[tag]/[file/mod.ts]
    urlpattern = /([^\/@]+)(@github)?\/([^\/@]+)(@)?(.*)/

    match(url: string): string {
        const match = this.urlpattern.exec(url)
        
        if (!match) {
            throw new URLMatchError(`${this.provider} url match error.`)
        }

        let [
            origin,
            username,
            provider,
            repository,
            version,
            restParams
        ] = match

        restParams = restParams !== '/' ? restParams : ''

        if (provider && provider !== `@${this.provider}`) {
            throw new URLMatchError(`${this.provider} without right provider.`)
        }

        if (!username || !repository) {
            throw new URLMatchError(`${this.provider} without username or repository specified.`)
        }

        const redirect = `https://raw.githubusercontent.com/${username}/${repository}/${
            version ? '' : 'master'
        }${restParams || '/mod.ts'}`

        return redirect
    }

}