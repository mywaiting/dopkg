import {
    Backend,
    URLMatchError
} from './backend.ts'


export class BitbucketBackend extends Backend {

    provider = 'bitbucket'

    // [user]@bitbucket/[repo]@[tag]/[file/mod.ts]
    urlpattern = /([^\/@]+)(@bitbucket)\/([^\/@]+)(@)?(.*)/

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

        const redirect = `https://raw.bitbucket.org/${username}/${repository}/${
            version ? '' : 'master'
        }${restParams || '/mod.ts'}`

        return redirect
    }

}