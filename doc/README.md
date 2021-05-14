# DOPKG

[dopkg](https://dopkg.com), aka deno open package, is a simple, fast, with global CDN, package import tool on [Deno](https://deno.land). Use it to quickly and easily import any file from any package using a URL like as 

```
https://dopkg.com/:user@:site/:repo@:tag/:file
```

## Examples

### Github Package

Use [Github](https://github.com) as a package registry for Deno, simple like this

- [dopkg.com/oakserver@github/oak@v7.4.0](https://dopkg.com/oakserver@github/oak@v7.4.0)
- [dopkg.com/xcatliu@github/pagic@v1.3.1](https://dopkg.com/xcatliu@github/pagic@v1.3.1)

The dopkg used Github as default, so, without `@github` more clearly.

- [dopkg.com/oakserver/oak@v7.4.0](https://dopkg.com/oakserver/oak@v7.4.0)
- [dopkg.com/xcatliu/pagic@v1.3.1](https://dopkg.com/xcatliu/pagic@v1.3.1)

Snippets with Deno link this

```typescript
import { Application } from 'https://dopkg.com/oakserver/oak@v7.4.0'
```

### Deno Official

Use [Deno Official](https://deno.land) package registry for Deno, simple like this

- [dopkg.com/std@deno/std@0.95.0/async](https://dopkg.com/std@deno/std@0.95.0/async)
- [dopkg.com/x@deno/oak@v7.4.0](https://dopkg.com/x@deno/oak@v7.4.0)

The dopkg with deno official package registry, must with `std@deno` or `x@deno` clearly.

### Nestland Package

Use [Nestland](https://nest.land) package registry for Deno, simple like this

- [dopkg.com/std@nest/std@0.95.0/async](https://dopkg.com/std@nest/std@0.95.0/async)
- [dopkg.com/x@nest/oak@v7.4.0](https://dopkg.com/x@nest/oak@v7.4.0)

The dopkg with nestland package registry, must with `std@nest` or `x@nest` clearly.


### Gitlab Package

Use [Gitlab](https://gitlab.com) as a package registry for Deno, simple like Github. But, must with `:user@gitlab` clearly.

### BitBucket Package

Use [BitBucket](https://bitbucket.org) as a package registry for Deno, simple like Github. But, must with `:user@bitbucket` clearly.


## About

[dopkg](https://dopkg.com) is an [open source](https://github.com/mywaiting/dopkg) project built and maintained by [mywaiting](https://twitter.com/mywaiting). dopkg is not affiliated with or supported by Deno, Inc. Please do not contact deno for help with dopkg. Instead, please feel free to reach out to [@mywaiting](https://twitter.com/mywaiting) with any questions. If you has Github, welcome to PR this!

The dopkg CDN is powered by [Cloudflare](https://www.cloudflare.com), and some our backend workers ran by [Cloudflare Workers](https://workers.cloudflare.com/).

The origin servers/workers runs on auto-scaling infrastructure provided by [Vercel](https://vercel.com).