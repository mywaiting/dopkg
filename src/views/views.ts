


export class Block {
    render() {}
}


export class HeadBlock extends Block {

    constructor(
        public title: string,
        public headCSS?: string[],
        public headJS?: string[]
    ) {
        super()
    }

    render() {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="author" content="DOPKG Developer" />
    <meta name="keywords" content="deno, deno package, deno install, deno import, deno run" />
    <title>${this.title}</title>
    <link rel="stylesheet" href="/assets/css/screen.css" />
    ${ this.headCSS?.length ? this.headCSS.forEach(css => `<link rel="stylesheet" href="${ css }"></script>`) : '' }
    ${ this.headJS?.length ? this.headJS.forEach(js => `<script type="text/javascript" src="${ js }"></script>`) : ''}
</head>
        `
    }

}

export class BodyBlock extends Block {

    constructor(
        public body: string,
        public bodyClass: string = 'page',
        public bodyJS?: string[]
    ) {
        super()
    }

    render() {
        return `
<body class="${ this.bodyClass }">
    <div id="app">
        <div id="root">${ this.body }</div>
    </div>
    <script type="text/javascript" src="/assets/js/main.js"></script>
    ${ this.bodyJS?.length ? this.bodyJS.forEach(js => `<script type="text/javascript" src="${ js }"></script>`) : ''}
</body>
</html>
        `
    }

}


export class HeaderBlock extends Block {

    render() {
        return `
<header id="header">
    <div class="container">
        <div class="brand">
            <h1 class="brand-name">DOPKG</h1>
            <p class="brand-slogen">
                <strong>d</strong>eno <strong>o</strong>pen <strong>p</strong>ac<strong>k</strong>a<strong>g</strong>e for package registry
            </p>
        </div>
    </div>
</header>
        `
    }

}

export class ContentBlock extends Block {

    constructor(
        public content: string
    ) {
        super()
    }

    render() {
        return `
<div id="content">
    <div class="container">
        ${ this.content }
    </div>
</div>
        `
    }

}

export class FooterBlock extends Block {

    render() {
        return `
<footer id="footer">
    <div class="container">
        <p class="copyright">&copy; 2021 DOPKG</p>
    </div>
</footer>
        `
    }

}


export class MainBlock extends Block {

    constructor(
        public main: string
    ) {
        super()
    }

    render() {
        return `
<main id="main">
    ${ this.main }
</main>
        `
    }

}

export class SideBlock extends Block {

    constructor(
        public side: string
    ) {
        super()
    }

    render() {
        return `
<aside id="aside">
    ${ this.side }
</aside>
        `
    }

}


export class Page {

    // page level block
    headBlock = HeadBlock
    bodyBlock = BodyBlock

    // body level block
    headerBlock = HeaderBlock
    contentBlock = ContentBlock
    footerBlock = FooterBlock

    // content level block
    mainBlock = MainBlock
    sideBlock = SideBlock

    render() {}

}
