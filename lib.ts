


type frwkNode = appFrwkNode | appFrwkTextNode

enum nodeType {
    basic,
    text
}

export type lengthConfig = {
    lengthOfShared: number // multiplier for this nodes width compared with normal shared width
    length: number // widthOfShared = 0 if this is used. normal width 
}


export class styleGroup {
    members: appFrwkNode[] = []
    styles: string[]
    constructor(styles: string[]) {
        this.styles = styles
    }
    set(style: string) {
        this.styles.push(style)
    }
}



export function shared(multiplier: number): (self: appFrwkNode)=>lengthConfig  {
    return (self: appFrwkNode)=>{return {length: 0, lengthOfShared: multiplier}}
}

export function px(pixels: number): (self: appFrwkNode)=>lengthConfig  {
    return (self: appFrwkNode)=>{return {length: pixels, lengthOfShared: 0}}
}

export function percentWidth(percent: number): (self: appFrwkNode)=>lengthConfig  {
    return (self: appFrwkNode)=>{return {length: self.parent!.width * percent, lengthOfShared: 0}}
}

export function percentHeight(percent: number): (self: appFrwkNode)=>lengthConfig  {
    return (self: appFrwkNode)=>{return {length: self.parent!.height * percent, lengthOfShared: 0}}
}


export class appFrwkNode {
    htmlNode: HTMLElement
    onMountQueue: (()=>void)[] = []
    nodeType = nodeType.basic
    styles: string[][] = []
    applyStyle(styles: string[]) {
        this.styles.push(styles)
        return this
    }
    addToStyleGroup(group: styleGroup) {
        this.styles.push(group.styles)
        group.members.push(this)
        return this
    }
    constructor(children: frwkNode[]) {
        this.children = children
        for (let i of children) {
            i.parent = this
        }
    }
    addEventListener(event: string, callback: (self: this, event: Event)=>void) {
        if (this.htmlNode) {
            this.htmlNode.addEventListener(event, (e)=>callback(this, e))
        } else {
            this.onMountQueue.push(()=>this.htmlNode.addEventListener(event, (e)=>callback(this, e)))
        }
        return this
    }
    children: frwkNode[] = []
    addChildren(children: frwkNode[]) {
        for (let i of children) {
            i.parent = this
            this.children.push(i)
        }
    }
    parent: appFrwkNode | undefined


    render(target: HTMLElement) {
        computeDimensions(this)
        this.updateDimensionsBlindly()
        let element = document.createElement("div")
        for (let i of this.children) {
            i.render(element)
        }
        this.htmlNode = element
        this.htmlNode.style.cssText = computeStyles(this.styles)

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
        for (let i of this.children) {
            if (i.htmlNode) {
                i.rerender()
            } else {
                i.render(this.htmlNode)
            }
        }
    }
    updateDimensions() {
        computeDimensions(this)
        this.updateDimensionsBlindly()
        for (let i of this.children) {
            i.updateDimensionsBlindly()
        }
    }
    updateDimensionsBlindly() {
        const d = ()=>{
            if (this.width > 0) {
                this.htmlNode.style.width = this.width + "px"
            }
            if (this.height > 0) {
                this.htmlNode.style.height = this.height + "px"
            }
        }
        if (this.htmlNode) {
            d()
        } else {
            this.onMountQueue.push(d)
        }
        
    }
    widthExpression: (self: appFrwkNode)=>lengthConfig
    heightExpression: (self: appFrwkNode)=>lengthConfig
    width: number = -1 // width in px
    height: number = -1 // width in px
    setWidth(expression: (self: appFrwkNode)=>lengthConfig) {
        this.widthExpression = expression
        return this
    }
    getWidth() {return this.width}
    setHeight(expression: (self: appFrwkNode)=>lengthConfig) {
        this.heightExpression = expression
        return this
    }
    getHeight() {return this.height}
}


function computeStyles(styles: string[][]) {
    let styleString = ""
    for (let i of styles) {
        for (let rule of i) {
            styleString+=rule
        }
    }
    return styleString
}

function computeDimensions(rootNode: appFrwkNode) {
    // computes dimensions of all descendants of rootNode (not rootNode itself)

    let widthSharers :appFrwkNode[] = []
    let totalWidthSharersLength = 0
    let totalWidthNotSharersLength = 0
    let heightSharers :appFrwkNode[] = []
    let totalHeightSharersLength = 0
    let totalHeightNotSharersLength = 0

    let allDimensionSharers: appFrwkNode[] = []

    for (let i of rootNode.children) {
        if (i.nodeType == nodeType.basic) {
            i = i as appFrwkNode
            var isDimensionsSharer = false
            if (i.widthExpression != undefined) {
                let width = i.widthExpression(i)
                if (width.lengthOfShared == 0) {
                    // just use normal px length
                    
                    i.width = width.length
                    totalWidthNotSharersLength+=width.length
                } else {
                    isDimensionsSharer = true
                    widthSharers.push(i)
                    totalWidthSharersLength+=width.lengthOfShared
                }
            }
            if (i.heightExpression != undefined) {
                let height = i.heightExpression(i)
                if (height.lengthOfShared == 0) {
                    // just use normal px length
                    i.height = height.length
                    totalHeightNotSharersLength+=height.length
                } else {
                    isDimensionsSharer = true
                    heightSharers.push(i)
                    totalHeightSharersLength+=height.lengthOfShared
                }
            }
            
            if (isDimensionsSharer) {
                allDimensionSharers.push(i)
            } else {
                computeDimensions(i)
            }
        }
        
    }

    let widthOfStandardSharedWidth = (rootNode.width - totalWidthNotSharersLength) / totalWidthSharersLength
    for (let i of widthSharers) {
        i.width = i.widthExpression(i).lengthOfShared*widthOfStandardSharedWidth
    }

    let heightOfStandardSharedHeight = (rootNode.height - totalHeightNotSharersLength) / totalHeightSharersLength
    for (let i of heightSharers) {
        console.log(i, heightOfStandardSharedHeight)
        i.height = i.heightExpression(i).lengthOfShared*heightOfStandardSharedHeight
    }

    for (let i of allDimensionSharers) {
        computeDimensions(i)
    }
}





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
    name = "text-input"
    styles = [
        ["color: red;"]
    ]
}

export class appFrwkTextNode extends appFrwkNode {
    constructor(content: string) {
        super([])
        this.content = content
    }
    textNode: Text
    render(target: HTMLElement): void {
        let n = document.createTextNode(this.content)
        this.textNode = n
        target.appendChild(n)
    }
    rerender(): void {
        this.textNode.data = this.content
    }
    nodeType = nodeType.text
    content: string
}



export function renderApp(node: appFrwkNode, target: HTMLElement) {
    node.applyStyle(["width: 100%;", "height: 100%; overflow: hidden;"])

    node.width = document.body.clientWidth
    node.height = document.body.clientHeight

    addEventListener("resize", ()=>{
        node.width = document.body.clientWidth
        node.height = document.body.clientHeight
        node.updateDimensions()
    })
    node.render(document.body)
}