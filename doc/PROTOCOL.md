# DOPKG Protocol

DOPKG Protocol, aka Deno Open Package Protocol, is a package registry proxy protocol for [Deno](https://deno.land) to import all packages from any registry.

## Protocol

DOPKG Protocol is described in [URLs](https://developer.mozilla.org/en-US/docs/Web/API/URL)

```
protocol://username:password@dopkg.com/:user@:site/:repo@:tag/:file
```

- the URL protocol must `https`.
- the URL used `username:password` as token for authencation.
- the URL used `:user@:site` as identity for which package registry
  - part `:user` means the package registry's username.
  - part `@:site` as the the package registry's name itself, for example github.
- the URL used `:repo@:tag` as identity for which package and its version tag.
  - part `:repo` or `:project` means the project or repo's name.
  - part `:tag` means the project or repo's tag such as `v0.1.0` or `v3.2.1-preview`.
- the URL `:file` is a catch-all place holder. It means the file path in the `:repo` or `:project`.
  - if the `:file` is empty, it will be filled with `/mod.ts` as default.


## How it works

When the [Deno](https://deno.land) import the package, it will worked as a browser that supported http/https. For exmaple

```typescript
import { Application } from 'https://dopkg.com/oakserver/oak@v7.4.0'
```

1. The Deno package fetcher will requested `https://dopkg.com/oakserver/oak@v7.4.0`.
2. the server will made a HTTP 301 redirection to `https://raw.githubusercontent.com/oakserver/oak/master/mod.ts`.
3.  So, the Deno package fetcher will got the code from Github.

It's simple but powerful to integrate all Deno's package registry.
