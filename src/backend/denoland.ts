import {
    Backend,
    URLMatchError
} from './backend.ts'


export class DenolandBackend extends Backend {

    provider = 'deno'

    // deno_std: std@deno/std@[tag]/[file/mod.ts]
    // deno_x: x@deno/oak@[tag]/[file/mod.ts]
    urlpattern = /(std|x)(@deno)\/([^\/@]+)(@[^\/]+)?(.*)/

    match(url: string): string {
        const match = this.urlpattern.exec(url)
        
        if (!match) {
            throw new URLMatchError(`${this.provider} url match error.`)
        }

        const [
            origin,
            library,
            provider,
            module,
            version,
            restParams
        ] = match

        if (provider && provider !== `@${this.provider}`) {
            throw new URLMatchError(`${this.provider} without right provider.`)
        }

        if (!version) {
            throw new URLMatchError(`${this.provider} require version specified.`)
        }

        if (library === 'std' && module !== 'std') {
            throw new URLMatchError(`${this.provider} std must use 'std' as module name`)
        }

        // redirect to `https://deno.land/std/`
        if (library === 'std') {
            return `https://cdn.deno.land/std/versions/${version}/raw/${restParams || 'mod.ts'}`
        } else {
            return `https://cdn.deno.land/${module}/versions/${version}/raw/${restParams || 'mod.ts'}`
        }

    }

}