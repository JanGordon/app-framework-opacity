import { appFrwkNode, appFrwkTextNode, button, container, percentHeight, percentWidth, px, renderApp, shared } from "../lib";
import { navbar } from "./nav";
import { verticalResizer, horizontalResizer } from "./resizers";

function demoButton() {
    return new button([new appFrwkTextNode("press me for rewards")]).addEventListener("click",(self)=>{
        let d = (self.children[0] as appFrwkTextNode)
        d.content = "wow well done"
        d.rerender()
    }).setHeight(shared(1)).applyStyle(["outline: none;"])
}



let app = new appFrwkNode([
    verticalResizer([
        navbar().setFlag("static", true),
        demoButton().setHeight(shared(1)),
        demoButton().setHeight(shared(1)),
        horizontalResizer([
            demoButton().setWidth(shared(1)),
            demoButton().setWidth(shared(1))
        ]).setHeight(shared(1))
    ]),
    
    
])


renderApp(app, document.body)