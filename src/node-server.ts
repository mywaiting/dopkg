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