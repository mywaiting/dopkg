import {
    Backend,
    URLMatchError
} from './backend.ts'


export class GitlabBackend extends Backend {

    provider = 'gitlab'

    // [user]@gitlab/[repo]@[tag]/[file/mod.ts]
    urlpattern = /([^\/@]+)(@gitlab)\/([^\/@]+)(@)?(.*)/

    match(url: string): string {
        const match = this.urlpattern.exec(url)
        
        if (!match) {
            throw new URLMatchError(`${this.provider} url match error.`)
        }

        const [
            origin,
            username,
            provider,
            repository,
            version,
            restParams
        ] = match

        if (provider && provider !== `@${this.provider}`) {
            throw new URLMatchError(`${this.provider} without right provider.`)
        }

        if (!username || !repository) {
            throw new URLMatchError(`${this.provider} without username or repository specified.`)
        }

        const redirect = `https://raw.gitlabusercontent.com/${username}/${repository}/${
            version ? '' : 'master'
        }${restParams || '/mod.ts'}`

        return redirect
    }

}