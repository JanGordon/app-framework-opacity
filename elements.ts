import { addStyleGroupStylesToDOM, appFrwkNode, computeDimensions, computeStyles } from "./lib"

export class button extends appFrwkNode {
    name = "button"
    styles = [
        ["color: red;", "padding: 0;", "border: none;", "outline: 1px solid black;"]
    ]
    render(target: HTMLElement): void {
        computeDimensions(this)
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
        computeDimensions(this)
        this.updateDimensionsBlindly()
        this.htmlNode.style.cssText = computeStyles(this.styles)
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.children) {
            if (i.htmlNode) {
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
        computeDimensions(this)
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
        computeDimensions(this)
        this.updateDimensionsBlindly()
        this.htmlNode.style.cssText = computeStyles(this.styles)
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.children) {
            if (i.htmlNode) {
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
        computeDimensions(this)
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
        computeDimensions(this)
        this.updateDimensionsBlindly()
        this.htmlNode.style.cssText = computeStyles(this.styles);
        addStyleGroupStylesToDOM(this.styleGroups);
        (this.htmlNode as HTMLAnchorElement).href = this.target
        for (let i of this.children) {
            if (i.htmlNode) {
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
        computeDimensions(this)
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
        computeDimensions(this)
        this.updateDimensionsBlindly()
        this.htmlNode.style.cssText = computeStyles(this.styles);
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.children) {
            if (i.htmlNode) {
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
        computeDimensions(this)
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
        computeDimensions(this)
        this.updateDimensionsBlindly()
        this.htmlNode.style.cssText = computeStyles(this.styles);
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.children) {
            if (i.htmlNode) {
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
        computeDimensions(this)
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
        computeDimensions(this)
        this.updateDimensionsBlindly()
        this.htmlNode.style.cssText = computeStyles(this.styles);
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.children) {
            if (i.htmlNode) {
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
        computeDimensions(this)
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
        computeDimensions(this)
        this.updateDimensionsBlindly()
        this.htmlNode.style.cssText = computeStyles(this.styles);
        addStyleGroupStylesToDOM(this.styleGroups)
        for (let i of this.children) {
            if (i.htmlNode) {
                i.rerender()
            } else {
                i.render(this.htmlNode)
            }
        }
    }
}