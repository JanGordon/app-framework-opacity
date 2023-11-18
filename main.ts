import { appFrwkNode, appFrwkTextNode, button, container, percentHeight, percentWidth, px, renderApp, shared } from "./lib";


function horizontalResizer(children: appFrwkNode[]) {
    const containerDiv = new container([]).setHeight(percentHeight(1)).setWidth(percentWidth(1)).applyStyle(["display: flex;", "flex-direction: row;"])
    let resizer = ()=>{
        var pressed = false
        var pressedOffsetX = 0
        document.addEventListener("pointerup", ()=>{
            pressed = false
        })
        let r = new button([])
        document.addEventListener("pointermove", (e)=>{
            if (pressed) {
                const indexOfSelf = containerDiv.children.indexOf(r)!
                const above = containerDiv.children[indexOfSelf-1]!
                const below = containerDiv.children[indexOfSelf+1]!
                const targetWidth = above.width + below.width
                const newHeightOfAbove = (e as MouseEvent).clientX - pressedOffsetX
                const newHeightOfBelow = targetWidth - newHeightOfAbove + r.width
                const aboveToBelowHeightRatio = newHeightOfAbove / newHeightOfBelow
    
                const currentShareOfAboveAndBelow = above.widthExpression(above).lengthOfShared + below.widthExpression(below).lengthOfShared
                const newAboveSharedRatio = (currentShareOfAboveAndBelow / 2) * aboveToBelowHeightRatio
                console.log(newAboveSharedRatio)
                above.setWidth(px(newHeightOfAbove))
                // above.setHeight(shared(newAboveSharedRatio))
                // below.setHeight(shared(currentShareOfAboveAndBelow - newAboveSharedRatio))
                containerDiv.updateDimensions()
            }
        })
        return r.addEventListener("click",(self)=>{
            let d = (self.children[0] as appFrwkTextNode)
            d.content = "wow well done"
            console.log(d)
            d.rerender()
        }).setWidth(px(5)).setHeight(percentHeight(1)).addEventListener("pointerdown", (self: button, e: Event)=>{
            pressed = true
            const c = containerDiv.htmlNode.getBoundingClientRect()
            const r = self.htmlNode.getBoundingClientRect()
            console.log(c, r, (e as MouseEvent).clientX)
            const xInResizer = (e as MouseEvent).clientX - r.left
            pressedOffsetX = (e as MouseEvent).clientX - c.left - r.left
        })
    }
    for (let index = 0; index < children.length; index++) {
        children[index].setWidth(percentWidth(1))
        if (index+1 < children.length) {
            containerDiv.addChildren([children[index], resizer()])
        } else {
            containerDiv.addChildren([children[index]])
        }
    }
    return containerDiv
}

function verticalResizer(children: appFrwkNode[]) {
    const containerDiv = new container([]).setHeight(percentHeight(1)).setWidth(percentWidth(1)).applyStyle(["display: flex;", "flex-direction: column;"])
    let resizer = ()=>{
        var pressed = false
        var pressedOffsetY = 0
        document.addEventListener("pointerup", ()=>{
            pressed = false
        })
        let r = new button([])
        document.addEventListener("pointermove", (e)=>{
            if (pressed) {
                const indexOfSelf = containerDiv.children.indexOf(r)!
                const above = containerDiv.children[indexOfSelf-1]!
                const below = containerDiv.children[indexOfSelf+1]!
                const targetHeight = above.height + below.height
                var totalHeightOfAllPartsAbove= 0 
                for (let i = 0; i < indexOfSelf-1; i++) {
                    totalHeightOfAllPartsAbove+=containerDiv.children[i].height
                }
                const newHeightOfAbove = (e as MouseEvent).clientY - pressedOffsetY - (totalHeightOfAllPartsAbove)
                const newHeightOfBelow = targetHeight - newHeightOfAbove + r.height
                const aboveToBelowHeightRatio = newHeightOfAbove / newHeightOfBelow
    
                const currentShareOfAboveAndBelow = above.heightExpression(above).lengthOfShared + below.heightExpression(below).lengthOfShared
                var newBelowSharedRatio = currentShareOfAboveAndBelow / (aboveToBelowHeightRatio + 1)
                var newAboveSharedRatio = currentShareOfAboveAndBelow - newBelowSharedRatio
                // above.setHeight(px(newHeightOfAbove))
                above.setHeight(shared(newAboveSharedRatio))
                below.setHeight(shared(newBelowSharedRatio))
                containerDiv.updateDimensions()
            }
        })
        return r.addEventListener("click",(self)=>{
            let d = (self.children[0] as appFrwkTextNode)
            d.content = "wow well done"
            console.log(d)
            d.rerender()
        }).setWidth(percentWidth(1)).setHeight(px(5)).addEventListener("pointerdown", (self: button, e: Event)=>{
            pressed = true
            const c = containerDiv.htmlNode.getBoundingClientRect()
            const r = self.htmlNode.getBoundingClientRect()
            console.log(c, r, (e as MouseEvent).clientY)
            pressedOffsetY = (e as MouseEvent).clientY - c.top - r.top
        })
    }
    for (let index = 0; index < children.length; index++) {
        children[index].setWidth(percentWidth(1))
        if (index+1 < children.length) {
            containerDiv.addChildren([children[index], resizer()])
        } else {
            containerDiv.addChildren([children[index]])
        }
    }
    return containerDiv
}


let app = new appFrwkNode([
    verticalResizer([
        new button([new appFrwkTextNode("press me for rewards")]).addEventListener("click",(self)=>{
            let d = (self.children[0] as appFrwkTextNode)
            d.content = "wow well done"
            console.log(d)
            d.rerender()
        }).setHeight(shared(1)),
        new button([new appFrwkTextNode("press me for rewards")]).addEventListener("click",(self)=>{
            let d = (self.children[0] as appFrwkTextNode)
            d.content = "wow well done"
            console.log(d)
            d.rerender()
        }).setHeight(shared(1)),
        horizontalResizer([
            new button([new appFrwkTextNode("press me for rewards")]).addEventListener("click",(self)=>{
                let d = (self.children[0] as appFrwkTextNode)
                d.content = "wow well done"
                console.log(d)
                d.rerender()
            }).setHeight(shared(1)),
            new button([new appFrwkTextNode("press me for rewards")]).addEventListener("click",(self)=>{
                let d = (self.children[0] as appFrwkTextNode)
                d.content = "wow well done"
                console.log(d)
                d.rerender()
            }).setHeight(shared(1))
        ]).setHeight(shared(1))
    ]),
    
    
])


renderApp(app, document.body)