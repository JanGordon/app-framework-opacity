import { addStyleGroupStylesToDOM, appFrwkNode, appFrwkTextNode, computeDimensions, computeStyles, renderBasics, rerenderBasics } from "./lib"

export class button extends appFrwkNode {
    name = "button"
    styles = [
        
    ]
    render(target: HTMLElement): void {
        let element = document.createElement("button")
        renderBasics(this, element)
        target.appendChild(element)
    }
}
export class container extends appFrwkNode {
    name = "container"
    render(target: HTMLElement): void {
        let element = document.createElement("div")
        renderBasics(this, element)
        target.appendChild(element)
    }
}
export class image extends appFrwkNode {
    name = "img"
    src: string
    setSrc(src: string) {
        this.changes.push(()=>{
            (this.htmlNode as HTMLImageElement).src = src
        })
        this.src = src
        return this
    }
    render(target: HTMLElement): void {
        let element = document.createElement("img")
        element.src = this.src
        renderBasics(this, element)
        target.appendChild(element)
    }
    rerender() {
        (this.htmlNode as HTMLImageElement).src = this.src
        rerenderBasics(this)
    }
}

export class video extends appFrwkNode {
    name = "video"
    src: string
    setSrc(src: string) {
        this.changes.push(()=>{
            (this.htmlNode as HTMLVideoElement).src = src
        })
        this.src = src
        return this
    }
    controls: boolean
    setControls(on: boolean) {
        this.changes.push(()=>{
            (this.htmlNode as HTMLVideoElement).controls = on
        })
        this.controls = on
        return this
    }
    autoplay: boolean
    setAutoplay(on: boolean) {
        this.changes.push(()=>{
            (this.htmlNode as HTMLVideoElement).autoplay = on
        })
        this.autoplay = on
        return this
    }
    render(target: HTMLElement): void {
        let element = document.createElement("video")
        element.controls = this.controls
        element.autoplay = this.autoplay
        element.src = this.src
        renderBasics(this, element)
        target.appendChild(element)
    }
    rerender() {
        (this.htmlNode as HTMLVideoElement).src = this.src;
        (this.htmlNode as HTMLVideoElement).controls = this.controls;
        (this.htmlNode as HTMLVideoElement).autoplay = this.autoplay
        rerenderBasics(this)
    }
}

export class audio extends appFrwkNode {
    name = "audio"
    src: string
    setSrc(src: string) {
        this.changes.push(()=>{
            (this.htmlNode as HTMLAudioElement).src = src
        })
        this.src = src
        return this
    }
    controls: boolean
    setControls(on: boolean) {
        this.changes.push(()=>{
            (this.htmlNode as HTMLAudioElement).controls = on
        })
        this.controls = on
        return this
    }
    autoplay: boolean
    setAutoplay(on: boolean) {
        this.changes.push(()=>{
            (this.htmlNode as HTMLAudioElement).autoplay = on
        })
        this.autoplay = on
        return this
    }
    render(target: HTMLElement): void {
        let element = document.createElement("audio")
        element.controls = this.controls
        element.autoplay = this.autoplay
        element.src = this.src
        renderBasics(this, element)
        target.appendChild(element)
    }
    rerender() {
        (this.htmlNode as HTMLVideoElement).src = this.src;
        (this.htmlNode as HTMLVideoElement).controls = this.controls;
        (this.htmlNode as HTMLVideoElement).autoplay = this.autoplay
        rerenderBasics(this)
    }
}

export class link extends appFrwkNode {
    name = "link"
    target = "/"
    setTarget(link: string) {
        this.changes.push(()=>{
            (this.htmlNode as HTMLAnchorElement).href = link
        })
        this.target = link
        return this
    }
    render(target: HTMLElement): void {
        let element = document.createElement("a") as HTMLAnchorElement
        element.href = this.target
        renderBasics(this, element)
        target.appendChild(element)
    }
    rerender() {
        (this.htmlNode as HTMLAnchorElement).href = this.target
        rerenderBasics(this)
    }
}

export class paragraph extends appFrwkNode {
    name = "paragraph"
    render(target: HTMLElement): void {
        let element = document.createElement("p")
        renderBasics(this, element)
        target.appendChild(element)
    }
}

export class header1 extends appFrwkNode {
    name = "header1"
    render(target: HTMLElement): void {
        let element = document.createElement("h1")
        renderBasics(this, element)
        target.appendChild(element)
    }
}

export class header2 extends appFrwkNode {
    name = "header2"
    render(target: HTMLElement): void {
        let element = document.createElement("h2")
        renderBasics(this, element)
        target.appendChild(element)
    }
}

export class textInput extends appFrwkNode {
    name = "textInput"
    render(target: HTMLElement): void {
        let element = document.createElement("input")
        element.type = "text"
        renderBasics(this, element)
        target.appendChild(element)
    }
}