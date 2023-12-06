import { button, container } from "../elements";
import { appFrwkNode, appFrwkTextNode, percentHeight, percentWidth, px, renderApp, shared } from "../lib";
import { navbar } from "./nav";
import { verticalResizer, horizontalResizer } from "./resizers";

const c = new container([])

function demoButton() {
    return new button([new appFrwkTextNode("press me for rewards")]).addEventListener("click",(self)=>{
        let d = (self.children[0] as appFrwkTextNode)
        d.content = "wow well done"
        d.rerender()
        c.addChildren([
            new button([new appFrwkTextNode("Hello Im a new child")]),
            new button([new appFrwkTextNode("Hello Im a 2nd new child")])
        ])
        c.applyStyle(["color: red;"])
        c.lightRerender()
    }).setHeight(shared(1)).applyStyle(["outline: none;"])
}



let app = new appFrwkNode([
    verticalResizer([
        navbar().setFlag("static", true),
        demoButton().setHeight(shared(1)),
        demoButton().setHeight(shared(1)),
        horizontalResizer([
            demoButton().setWidth(shared(1)),
            c.setWidth(shared(1))
        ]).setHeight(shared(1))
    ]),
    
    
])


renderApp(app, document.body)