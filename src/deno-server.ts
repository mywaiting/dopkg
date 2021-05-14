import {
    Application,
    HTTPError,
    Context,
    Router,
    RouterContext,
    Status
} from '../../adventure/mod.ts'

import { Backend, URLMatchError } from './backend/backend.ts'
import { BitbucketBackend } from './backend/bitbucket.ts'
import { DenolandBackend }  from './backend/denoland.ts'
import { GithubBackend }    from './backend/github.ts'
import { GitlabBackend }    from './backend/gitlab.ts'
import { NestlandBackend }  from './backend/nestland.ts'

import { PageIndex } from './views/index.ts'

export const BackendFactory = {
    'bitbucket': BitbucketBackend,
    'denoland' : DenolandBackend,
    'github'   : GithubBackend,
    'gitlab'   : GitlabBackend,
    'nestland' : NestlandBackend,
}

export const PageFactory = {
    'index': PageIndex,
}


const DEBUG = true



const router = new Router()

router.get('/', (context: RouterContext) => {
    const pageIndex = new PageFactory.index()
    context.response.body = pageIndex.render()
})

// static assets for dev
if (DEBUG) {
    const currentPath = Deno.cwd()
    const assets = async (context: RouterContext) => {
        await context.send({
            root: `${currentPath}/public`,
            index: 'index.html'
        })
        // hack for css file's content-type
        if (context.request.url.pathname.endsWith('.css')) {
            context.response.type = 'text/css'
        }
        if (context.request.url.pathname.endsWith('.js')) {
            context.response.type = 'text/javascript'
        }
    }
    router.get('/favicon.ico', assets)
    router.get('/assets/*file', assets)
}

function redirect(context: RouterContext) {
    const user = context.params.get('user')
    const repo = context.params.get('repo')
    const file = context.params.get('*')

    if (!user || !repo) {
        throw new HTTPError(404)
    }

    let origin = `${user}/${repo}/${file ? file : ''}`
    let redirect = ''

    if (DEBUG) console.log(`origin: ${origin}`)

    // shortcut, default URL without @ used in Github
    if (!user.includes('@')) {
        origin = `${user}@github/${repo}/${file ? file : ''}`
        const backend = new GithubBackend()
        try {
            redirect = backend.match(origin)
        } catch (error) {
            if (error instanceof URLMatchError) {
                throw new HTTPError(404)
            } else {
                throw error
            }
        }
    
    } else {
        for (const provider in BackendFactory) {
            // @ts-ignore 7053
            const backend = new BackendFactory[provider]()
            try {
                redirect = backend.match(origin)
            } catch (error) {
                if (error instanceof URLMatchError) {
                    continue
                } else {
                    throw error
                }
            }
        }
    }

    if (!redirect) {
        throw new HTTPError(404)
    }

    if (DEBUG) console.log(`redirect: ${redirect}`)

    context.response.status = 302
    context.response.headers.set('Location', redirect)
    return
}
router.get('/:user/:repo', redirect)
router.get('/:user/:repo/', redirect)
router.get('/:user/:repo/*file', redirect)




const app = new Application()

app.use(async (context, next) => { // logger middleware
    await next()
    const date = new Date()
    console.log(`${date.toISOString()}  -  ${context.request.ip} ${context.request.method} ${context.response.status } ${context.request.url.pathname}`)
})

app.use(async (context, next) => {
    try {
        await next()
    } catch (error) {
        if (error instanceof HTTPError) {
            // deno-lint-ignore no-explicit-any
            context.response.status = error.status as any
            if (error.expose) {
                context.response.body = `<!DOCTYPE html>
                <html><body><h1>${error.status} - ${error.message}</h1></body></html>`
            } else {
                context.response.body = `<!DOCTYPE html>
                <html><body><h1>${error.status} - ${Status[error.status]}</h1></body></html>`
            }
        } else if (error instanceof Error) {
            context.response.status = 500
            context.response.body = `<!DOCTYPE html>
                <html><body><h1>500 - Internal Server Error</h1></body></html>`
            console.log("Unhandled Error:", error.message)
            console.log(error.stack)
        } else {
            context.response.status = 500
            context.response.body = `<!DOCTYPE html>
                <html><body><h1>500 - Internal Server Error</h1></body></html>`
            console.log("Unhandled Error:", error.message)
        }
    }
})

app.use(router.routes())
app.use(router.allowedMethods())



app.addEventListener('listen', ({ detail = {} }: CustomEventInit) => {
    const { hostname, port, secure } = detail
    console.log(`start listening on ${hostname}:${port} as ${secure ? 'HTTPS' : 'HTTP'} Server`)
})
app.addEventListener('error', ({ detail = {} }: CustomEventInit) => {
    const { message, error } = detail
    console.log('error', message, error)
})

app.listen(8080)