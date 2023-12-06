import { addStyleGroupStylesToDOM, appFrwkNode, appFrwkTextNode, computeDimensions, computeStyles } from "./lib"

export class button extends appFrwkNode {
    name = "button"
    styles = [
        
    ]
    render(target: HTMLElement): void {
        computeDimensions(this.parent!)
        this.updateDimensionsBlindly()
        let element = document.createElement("button")
        for (let i of this.children) {
            i.render(element)
        }
        this.htmlNode = element
        this.htmlNode.style.cssText = computeStyles(this.styles)

        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.onMountQueue) {
            i()
        }
        this.onMountQueue = []
        target.appendChild(element)
    }
    rerender() {
        computeDimensions(this.parent!)
        this.htmlNode.style.cssText = computeStyles(this.styles)
        this.updateDimensionsBlindly()
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.children) {
            if (i.htmlNode || (i as appFrwkTextNode).textNode) {
                i.rerender()
            } else {
                i.render(this.htmlNode)
            }
        }
    }
}
export class container extends appFrwkNode {
    name = "button"
    styles = [
        // ["color: red;"]
    ]
    render(target: HTMLElement): void {
        computeDimensions(this.parent!)
        this.updateDimensionsBlindly()
        let element = document.createElement("div")
        for (let i of this.children) {
            i.render(element)
        }
        this.htmlNode = element
        this.htmlNode.style.cssText = computeStyles(this.styles)

        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.onMountQueue) {
            i()
        }
        this.onMountQueue = []
        target.appendChild(element)
    }
    rerender() {
        computeDimensions(this.parent!)
        this.htmlNode.style.cssText = computeStyles(this.styles)
        this.updateDimensionsBlindly()
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.children) {
            if (i.htmlNode || (i as appFrwkTextNode).textNode) {
                i.rerender()
            } else {
                i.render(this.htmlNode)
            }
        }
    }
}
export class image extends appFrwkNode {
    name = "img"
    styles = [
        
    ]
    src: string
    setSrc(src: string) {
        this.src = src
        return this
    }
    render(target: HTMLElement): void {
        computeDimensions(this.parent!)
        this.updateDimensionsBlindly()
        let element = document.createElement("img")
        for (let i of this.children) {
            i.render(element)
        }
        this.htmlNode = element;
        (this.htmlNode as HTMLImageElement).src = this.src
        this.htmlNode.style.cssText = computeStyles(this.styles)

        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.onMountQueue) {
            i()
        }
        this.onMountQueue = []
        target.appendChild(element)
    }
    rerender() {
        computeDimensions(this.parent!)
        this.updateDimensionsBlindly();
        (this.htmlNode as HTMLImageElement).src = this.src
        this.htmlNode.style.cssText = computeStyles(this.styles)
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.children) {
            if (i.htmlNode || (i as appFrwkTextNode).textNode) {
                i.rerender()
            } else {
                i.render(this.htmlNode)
            }
        }
    }
}

export class video extends appFrwkNode {
    name = "video"
    styles = [
        
    ]
    src: string
    setSrc(src: string) {
        this.src = src
        return this
    }
    controls: boolean
    setControls(on: boolean) {
        this.controls = on
        return this
    }
    autoplay: boolean
    setAutoplay(on: boolean) {
        this.autoplay = on
        return this
    }
    render(target: HTMLElement): void {
        computeDimensions(this.parent!)
        this.updateDimensionsBlindly()
        let element = document.createElement("video")
        element.controls = this.controls
        element.autoplay = this.autoplay
        for (let i of this.children) {
            i.render(element)
        }
        this.htmlNode = element;
        (this.htmlNode as HTMLVideoElement).src = this.src
        this.htmlNode.style.cssText = computeStyles(this.styles)

        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.onMountQueue) {
            i()
        }
        this.onMountQueue = []
        target.appendChild(element)
    }
    rerender() {
        computeDimensions(this.parent!)
        this.updateDimensionsBlindly();
        (this.htmlNode as HTMLVideoElement).src = this.src;
        (this.htmlNode as HTMLVideoElement).controls = this.controls;
        (this.htmlNode as HTMLVideoElement).autoplay = this.autoplay
        this.htmlNode.style.cssText = computeStyles(this.styles)
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.children) {
            if (i.htmlNode || (i as appFrwkTextNode).textNode) {
                i.rerender()
            } else {
                i.render(this.htmlNode)
            }
        }
    }
}

export class audio extends appFrwkNode {
    name = "audio"
    styles = [
        
    ]
    src: string
    setSrc(src: string) {
        this.src = src
        return this
    }
    controls: boolean
    setControls(on: boolean) {
        this.controls = on
        return this
    }
    autoplay: boolean
    setAutoplay(on: boolean) {
        this.autoplay = on
        return this
    }
    render(target: HTMLElement): void {
        computeDimensions(this.parent!)
        this.updateDimensionsBlindly()
        let element = document.createElement("audio")
        element.controls = this.controls
        element.autoplay = this.autoplay
        for (let i of this.children) {
            i.render(element)
        }
        this.htmlNode = element;
        (this.htmlNode as HTMLVideoElement).src = this.src
        this.htmlNode.style.cssText = computeStyles(this.styles)

        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.onMountQueue) {
            i()
        }
        this.onMountQueue = []
        target.appendChild(element)
    }
    rerender() {
        computeDimensions(this.parent!)
        this.updateDimensionsBlindly();
        (this.htmlNode as HTMLVideoElement).src = this.src;
        (this.htmlNode as HTMLVideoElement).controls = this.controls;
        (this.htmlNode as HTMLVideoElement).autoplay = this.autoplay
        this.htmlNode.style.cssText = computeStyles(this.styles)
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.children) {
            if (i.htmlNode || (i as appFrwkTextNode).textNode) {
                i.rerender()
            } else {
                i.render(this.htmlNode)
            }
        }
    }
}

export class link extends appFrwkNode {
    name = "link"
    styles = [
        // ["color: red;"]
    ]
    target = "/"
    setTarget(link: string) {
        this.target = link
        return this
    }
    render(target: HTMLElement): void {
        computeDimensions(this.parent!)
        this.updateDimensionsBlindly()
        let element = document.createElement("a") as HTMLAnchorElement
        element.href = this.target
        for (let i of this.children) {
            i.render(element)
        }
        this.htmlNode = element
        this.htmlNode.style.cssText = computeStyles(this.styles)

        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.onMountQueue) {
            i()
        }
        this.onMountQueue = []
        target.appendChild(element)
    }
    rerender() {
        computeDimensions(this.parent!)
        this.htmlNode.style.cssText = computeStyles(this.styles)
        this.updateDimensionsBlindly();
        addStyleGroupStylesToDOM(this.styleGroups);
        (this.htmlNode as HTMLAnchorElement).href = this.target
        for (let i of this.children) {
            if (i.htmlNode || (i as appFrwkTextNode).textNode) {
                i.rerender()
            } else {
                i.render(this.htmlNode)
            }
        }
    }
}

export class paragraph extends appFrwkNode {
    name = "paragraph"
    styles = [
        // ["color: red;"]
    ]
    render(target: HTMLElement): void {
        computeDimensions(this.parent!)
        this.updateDimensionsBlindly()
        let element = document.createElement("p")
        for (let i of this.children) {
            i.render(element)
        }
        this.htmlNode = element
        this.htmlNode.style.cssText = computeStyles(this.styles)

        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.onMountQueue) {
            i()
        }
        this.onMountQueue = []
        target.appendChild(element)
    }
    rerender() {
        computeDimensions(this.parent!)
        this.htmlNode.style.cssText = computeStyles(this.styles)
        this.updateDimensionsBlindly();
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.children) {
            if (i.htmlNode || (i as appFrwkTextNode).textNode) {
                i.rerender()
            } else {
                i.render(this.htmlNode)
            }
        }
    }
}

export class header1 extends appFrwkNode {
    name = "header1"
    styles = [
        // ["color: red;"]
    ]
    render(target: HTMLElement): void {
        computeDimensions(this.parent!)
        this.updateDimensionsBlindly()
        let element = document.createElement("h1")
        for (let i of this.children) {
            i.render(element)
        }
        this.htmlNode = element
        this.htmlNode.style.cssText = computeStyles(this.styles)
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.onMountQueue) {
            i()
        }
        this.onMountQueue = []
        target.appendChild(element)
    }
    rerender() {
        computeDimensions(this.parent!)
        this.htmlNode.style.cssText = computeStyles(this.styles)
        this.updateDimensionsBlindly();
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.children) {
            if (i.htmlNode || (i as appFrwkTextNode).textNode) {
                i.rerender()
            } else {
                i.render(this.htmlNode)
            }
        }
    }
}

export class header2 extends appFrwkNode {
    name = "header2"
    styles = [
        // ["color: red;"]
    ]
    render(target: HTMLElement): void {
        computeDimensions(this.parent!)
        this.updateDimensionsBlindly()
        let element = document.createElement("h2")
        for (let i of this.children) {
            i.render(element)
        }
        this.htmlNode = element
        this.htmlNode.style.cssText = computeStyles(this.styles)
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.onMountQueue) {
            i()
        }
        this.onMountQueue = []
        target.appendChild(element)
    }
    rerender() {
        computeDimensions(this.parent!)
        this.htmlNode.style.cssText = computeStyles(this.styles)
        this.updateDimensionsBlindly();
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.children) {
            if (i.htmlNode || (i as appFrwkTextNode).textNode) {
                i.rerender()
            } else {
                i.render(this.htmlNode)
            }
        }
    }
}

export class textInput extends appFrwkNode {
    name = "textInput"
    styles = [
        // ["color: red;"]
    ]
    render(target: HTMLElement): void {
        computeDimensions(this.parent!)
        this.updateDimensionsBlindly()
        let element = document.createElement("input")
        element.type = "text"
        for (let i of this.children) {
            i.render(element)
        }
        this.htmlNode = element
        this.htmlNode.style.cssText = computeStyles(this.styles)
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.onMountQueue) {
            i()
        }
        this.onMountQueue = []
        target.appendChild(element)
    }
    rerender() {
        computeDimensions(this.parent!)
        this.htmlNode.style.cssText = computeStyles(this.styles)
        this.updateDimensionsBlindly();
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.children) {
            if (i.htmlNode || (i as appFrwkTextNode).textNode) {
                i.rerender()
            } else {
                i.render(this.htmlNode)
            }
        }
    }
}