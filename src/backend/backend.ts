


export class Backend {
    provider!: string
    urlpattern!: RegExp

    match(url: string) {}
}

export class URLMatchError extends Error {}

