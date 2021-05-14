import {
    Page
} from './views.ts'


export class PageIndex extends Page {

    // SPECIAL_OCTAL_CHARS = "\00a0"

    inlineCSS = `
/* (c) 2021 DOPKG. All rights reserved. */
html {
    font-family: sans-serif;
    font-size: 62.5%; /* 1rem=10px */
    line-height: 1.15;
}
body { 
    margin: 0; 
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 1rem;
    line-height: 1.5;
}
p { margin-top: 0; margin-bottom: 1rem;}
ol, ul, dl { margin-top: 0; margin-bottom: 1rem;}
ol ol, ul ul, ol ul, ul ol { margin-bottom: 0;}
pre, code {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 1rem;
}
pre { margin-top: 0; margin-bottom: 1rem; overflow: auto;}
img { vertical-align: middle; border-style: none;}
svg { overflow: hidden; vertical-align: middle;}
a { text-decoration: none;}
a:hover { text-decoration: underline;}

body, input, textarea, td, button {
    font-size: 1.6rem; /* 1.6rem=16px */
}
code, pre {
    font-size: 1.6rem; /* 1.6rem=16px */
    
}

.container { width: 730px; margin: 0 auto;}
#header { margin-top: 5rem; padding-bottom: 5rem;}
#header .brand { text-align: center; font-size: 3.6rem;}
#header .brand-name { margin: 0;}
#header .brand-slogen { font-size: 2.8rem;}
#footer { background-color: #333; color: #eee; margin-top: 5rem;}
#footer .container { padding: 3rem 0 2.5rem; text-align: center;}

.markdown {line-height: 1.5; word-wrap: break-word;}
.markdown code {
    padding: 0.2em 0;
    margin: 0;
    font-size: 85%;
    background-color: rgba(27,31,35,0.05);
    border-radius: 3px
}
.markdown code::before, .markdown code::after { letter-spacing: -0.2em; content: " ";}
.markdown code::before { padding: 0.2em;}
.markdown pre {
    background-color: rgba(0, 0, 0, 0.05); 
    padding-top: 2.5rem;
    word-wrap: normal;
}
    `
    // .replaceAll(/[\n]+/ig, '').replaceAll(/[\s]+/ig, ' ')

    inlineJS = `
/* (c) 2021 DOPKG. All rights reserved. */
window.dopkg = {}
    `

    render() {
        const title = 'DOPKG'
        
        // origin from `doc/README.md`
        const main = `
<div class="content markdown">
    <p><a href="https://dopkg.com">Dopkg</a>, aka deno open package, is a simple, fast, with global CDN, package import tool on <a href="https://deno.land" rel="nofollow">Deno</a>. Use it to quickly and easily import any file from any package using a URL like as </p>
    <pre>
    https://dopkg.com/:user@:site/:repo@:tag/:file
    </pre>
    
    <h2>Examples</h2>

    <h3>Github Package</h3>
    <p>Use <a href="https://github.com">Github</a> as a package registry for Deno, simple like this</p>
    <ul>
        <li><a href="https://dopkg.com/oakserver@github/oak@v7.3.0" rel="nofollow">dopkg.com/oakserver@github/oak@v7.3.0</a></li>
        <li><a href="https://dopkg.com/xcatliu@github/pagic@v1.3.1" rel="nofollow">dopkg.com/xcatliu@github/pagic@v1.3.1</a></li>
    </ul>
    <p>The dopkg used Github as default, so, without <code>@github</code> more clearly.</p>
    <ul>
        <li><a href="https://dopkg.com/oakserver/oak@v7.3.0" rel="nofollow">dopkg.com/oakserver/oak@v7.3.0</a></li>
        <li><a href="https://dopkg.com/xcatliu/pagic@v1.3.1" rel="nofollow">dopkg.com/xcatliu/pagic@v1.3.1</a></li>
    </ul>
    <p>Snippets with Deno link this</p>
    <pre>
    import { Application } from 'https://dopkg.com/oakserver/oak@v7.3.0'
    </pre>

    <h3>Deno Official</h3>
    <p>Use <a href="https://deno.land" rel="nofollow">Deno Official</a> package registry for Deno, simple like this</p>
    <ul>
        <li><a href="https://dopkg.com/std@deno/std@0.95.0/async" rel="nofollow">dopkg.com/std@deno/std@0.95.0/async</a></li>
        <li><a href="https://dopkg.com/x@deno/oak@v7.3.0" rel="nofollow">dopkg.com/x@deno/oak@v7.3.0</a></li>
    </ul>
    <p>The dopkg with deno official package registry, must with <code>std@deno</code> or <code>x@deno</code> clearly.</p>
    
    <h3>Nestland Package</h3>
    <p>Use <a href="https://nest.land" rel="nofollow">Nestland</a> package registry for Deno, simple like this</p>
    <ul>
        <li><a href="https://dopkg.com/std@nest/std@0.95.0/async" rel="nofollow">dopkg.com/std@nest/std@0.95.0/async</a></li>
        <li><a href="https://dopkg.com/x@nest/oak@v7.3.0" rel="nofollow">dopkg.com/x@nest/oak@v7.3.0</a></li>
    </ul>
    <p>The dopkg with nestland package registry, must with <code>std@nest</code> or <code>x@nest</code> clearly.</p>
    
    <h3>Gitlab Package</h3>
    <p>Use <a href="https://gitlab.com" rel="nofollow">Gitlab</a> as a package registry for Deno, simple like Github. But, must with <code>:user@gitlab</code> clearly.</p>
    
    <h3>BitBucket Package</h3>
    <p>Use <a href="https://bitbucket.org" rel="nofollow">BitBucket</a> as a package registry for Deno, simple like Github. But, must with <code>:user@bitbucket</code> clearly.</p>
    
    <h2>About</h2>
    <p><a href="https://dopkg.com">Dopkg</a> is an <a href="https://github.com/mywaiting/dopkg">open source</a> project built and maintained by <a href="https://twitter.com/mywaiting">mywaiting</a>. dopkg is not affiliated with or supported by Deno, Inc. Please do not contact deno for help with dopkg. Instead, please feel free to reach out to <a href="https://twitter.com/mywaiting">@mywaiting</a> with any questions. If you has Github, welcome to PR this!</p>
    <p>The dopkg CDN is powered by <a href="https://www.cloudflare.com" rel="nofollow">Cloudflare</a>, and some our backend workers ran by <a href="https://workers.cloudflare.com/" rel="nofollow">Cloudflare Workers</a>.</p>
    <p>The origin servers/workers runs on auto-scaling infrastructure provided by <a href="https://vercel.com" rel="nofollow">Vercel</a>.</p>
</div>
        `
        const content = `
${ new this.mainBlock(/* main*/main).render() }
        `
        const body = `
${ new this.headerBlock().render() }
${ new this.contentBlock(/* content */content).render() }
${ new this.footerBlock().render() }
        `
        const page = `
${ 
    new this.headBlock(
        /* title */title,
        /* linkCSS */undefined,
        /* linkJS */undefined,
        /* inlineCSS */this.inlineCSS,
        /* inlineJS */undefined
    ).render() 
}
${ 
    new this.bodyBlock(
        /* body */body, 
        /* bodyClass */'page index',
        /* linkJS */undefined,
        /* inlineJS */this.inlineJS
    ).render() 
}
        `
        return page
    }
}
