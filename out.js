(() => {
  // lib.ts
  function shared(multiplier) {
    return (self) => {
      return { length: 0, lengthOfShared: multiplier };
    };
  }
  function px(pixels) {
    return (self) => {
      return { length: pixels, lengthOfShared: 0 };
    };
  }
  function percentWidth(percent) {
    return (self) => {
      return { length: self.parent.width * percent, lengthOfShared: 0 };
    };
  }
  function percentHeight(percent) {
    return (self) => {
      return { length: self.parent.height * percent, lengthOfShared: 0 };
    };
  }
  var appFrwkNode = class {
    constructor(children) {
      this.onMountQueue = [];
      this.nodeType = 0 /* basic */;
      this.styles = [];
      this.children = [];
      this.width = -1;
      this.height = -1;
      this.children = children;
      for (let i of children) {
        i.parent = this;
      }
    }
    applyStyle(styles) {
      this.styles.push(styles);
      return this;
    }
    addToStyleGroup(group) {
      this.styles.push(group.styles);
      group.members.push(this);
      return this;
    }
    addEventListener(event, callback) {
      if (this.htmlNode) {
        this.htmlNode.addEventListener(event, (e) => callback(this, e));
      } else {
        this.onMountQueue.push(() => this.htmlNode.addEventListener(event, (e) => callback(this, e)));
      }
      return this;
    }
    addChildren(children) {
      for (let i of children) {
        i.parent = this;
        this.children.push(i);
      }
    }
    render(target) {
      computeDimensions(this);
      this.updateDimensionsBlindly();
      let element = document.createElement("div");
      for (let i of this.children) {
        i.render(element);
      }
      this.htmlNode = element;
      this.htmlNode.style.cssText = computeStyles(this.styles);
      for (let i of this.onMountQueue) {
        i();
      }
      this.onMountQueue = [];
      target.appendChild(element);
    }
    rerender() {
      computeDimensions(this);
      this.updateDimensionsBlindly();
      this.htmlNode.style.cssText = computeStyles(this.styles);
      for (let i of this.children) {
        if (i.htmlNode) {
          i.rerender();
        } else {
          i.render(this.htmlNode);
        }
      }
    }
    updateDimensions() {
      computeDimensions(this);
      this.updateDimensionsBlindly();
      for (let i of this.children) {
        i.updateDimensionsBlindly();
      }
    }
    updateDimensionsBlindly() {
      const d = () => {
        if (this.width > 0) {
          this.htmlNode.style.width = this.width + "px";
        }
        if (this.height > 0) {
          this.htmlNode.style.height = this.height + "px";
        }
      };
      if (this.htmlNode) {
        d();
      } else {
        this.onMountQueue.push(d);
      }
    }
    setWidth(expression) {
      this.widthExpression = expression;
      return this;
    }
    getWidth() {
      return this.width;
    }
    setHeight(expression) {
      this.heightExpression = expression;
      return this;
    }
    getHeight() {
      return this.height;
    }
  };
  function computeStyles(styles) {
    let styleString = "";
    for (let i of styles) {
      for (let rule of i) {
        styleString += rule;
      }
    }
    return styleString;
  }
  function computeDimensions(rootNode) {
    let widthSharers = [];
    let totalWidthSharersLength = 0;
    let totalWidthNotSharersLength = 0;
    let heightSharers = [];
    let totalHeightSharersLength = 0;
    let totalHeightNotSharersLength = 0;
    let allDimensionSharers = [];
    for (let i of rootNode.children) {
      if (i.nodeType == 0 /* basic */) {
        i = i;
        var isDimensionsSharer = false;
        if (i.widthExpression != void 0) {
          let width = i.widthExpression(i);
          if (width.lengthOfShared == 0) {
            i.width = width.length;
            totalWidthNotSharersLength += width.length;
          } else {
            isDimensionsSharer = true;
            widthSharers.push(i);
            totalWidthSharersLength += width.lengthOfShared;
          }
        }
        if (i.heightExpression != void 0) {
          let height = i.heightExpression(i);
          if (height.lengthOfShared == 0) {
            i.height = height.length;
            totalHeightNotSharersLength += height.length;
          } else {
            isDimensionsSharer = true;
            heightSharers.push(i);
            totalHeightSharersLength += height.lengthOfShared;
          }
        }
        if (isDimensionsSharer) {
          allDimensionSharers.push(i);
        } else {
          computeDimensions(i);
        }
      }
    }
    let widthOfStandardSharedWidth = (rootNode.width - totalWidthNotSharersLength) / totalWidthSharersLength;
    for (let i of widthSharers) {
      i.width = i.widthExpression(i).lengthOfShared * widthOfStandardSharedWidth;
    }
    let heightOfStandardSharedHeight = (rootNode.height - totalHeightNotSharersLength) / totalHeightSharersLength;
    for (let i of heightSharers) {
      console.log(i, heightOfStandardSharedHeight);
      i.height = i.heightExpression(i).lengthOfShared * heightOfStandardSharedHeight;
    }
    for (let i of allDimensionSharers) {
      computeDimensions(i);
    }
  }
  var button = class extends appFrwkNode {
    constructor() {
      super(...arguments);
      this.name = "button";
      this.styles = [
        ["color: red;", "padding: 0;", "border: none;", "outline: 1px solid black;"]
      ];
    }
    render(target) {
      computeDimensions(this);
      this.updateDimensionsBlindly();
      let element = document.createElement("button");
      for (let i of this.children) {
        i.render(element);
      }
      this.htmlNode = element;
      this.htmlNode.style.cssText = computeStyles(this.styles);
      for (let i of this.onMountQueue) {
        i();
      }
      this.onMountQueue = [];
      target.appendChild(element);
    }
    rerender() {
      computeDimensions(this);
      this.updateDimensionsBlindly();
      this.htmlNode.style.cssText = computeStyles(this.styles);
      for (let i of this.children) {
        if (i.htmlNode) {
          i.rerender();
        } else {
          i.render(this.htmlNode);
        }
      }
    }
  };
  var container = class extends appFrwkNode {
    constructor() {
      super(...arguments);
      this.name = "button";
      this.styles = [];
    }
    render(target) {
      computeDimensions(this);
      this.updateDimensionsBlindly();
      let element = document.createElement("div");
      for (let i of this.children) {
        i.render(element);
      }
      this.htmlNode = element;
      this.htmlNode.style.cssText = computeStyles(this.styles);
      for (let i of this.onMountQueue) {
        i();
      }
      this.onMountQueue = [];
      target.appendChild(element);
    }
    rerender() {
      computeDimensions(this);
      this.updateDimensionsBlindly();
      this.htmlNode.style.cssText = computeStyles(this.styles);
      for (let i of this.children) {
        if (i.htmlNode) {
          i.rerender();
        } else {
          i.render(this.htmlNode);
        }
      }
    }
  };
  var appFrwkTextNode = class extends appFrwkNode {
    constructor(content) {
      super([]);
      this.nodeType = 1 /* text */;
      this.content = content;
    }
    render(target) {
      let n = document.createTextNode(this.content);
      this.textNode = n;
      target.appendChild(n);
    }
    rerender() {
      this.textNode.data = this.content;
    }
  };
  function renderApp(node, target) {
    node.applyStyle(["width: 100%;", "height: 100%; overflow: hidden;"]);
    node.width = document.body.clientWidth;
    node.height = document.body.clientHeight;
    addEventListener("resize", () => {
      node.width = document.body.clientWidth;
      node.height = document.body.clientHeight;
      node.updateDimensions();
    });
    node.render(document.body);
  }

  // main.ts
  function horizontalResizer(children) {
    const containerDiv = new container([]).setHeight(percentHeight(1)).setWidth(percentWidth(1)).applyStyle(["display: flex;", "flex-direction: row;"]);
    let resizer = () => {
      var pressed = false;
      var pressedOffsetX = 0;
      document.addEventListener("pointerup", () => {
        pressed = false;
      });
      let r = new button([]);
      document.addEventListener("pointermove", (e) => {
        if (pressed) {
          const indexOfSelf = containerDiv.children.indexOf(r);
          const above = containerDiv.children[indexOfSelf - 1];
          const below = containerDiv.children[indexOfSelf + 1];
          const targetWidth = above.width + below.width;
          const newHeightOfAbove = e.clientX - pressedOffsetX;
          const newHeightOfBelow = targetWidth - newHeightOfAbove + r.width;
          const aboveToBelowHeightRatio = newHeightOfAbove / newHeightOfBelow;
          const currentShareOfAboveAndBelow = above.widthExpression(above).lengthOfShared + below.widthExpression(below).lengthOfShared;
          const newAboveSharedRatio = currentShareOfAboveAndBelow / 2 * aboveToBelowHeightRatio;
          console.log(newAboveSharedRatio);
          above.setWidth(px(newHeightOfAbove));
          containerDiv.updateDimensions();
        }
      });
      return r.addEventListener("click", (self) => {
        let d = self.children[0];
        d.content = "wow well done";
        console.log(d);
        d.rerender();
      }).setWidth(px(5)).setHeight(percentHeight(1)).addEventListener("pointerdown", (self, e) => {
        pressed = true;
        const c = containerDiv.htmlNode.getBoundingClientRect();
        const r2 = self.htmlNode.getBoundingClientRect();
        console.log(c, r2, e.clientX);
        const xInResizer = e.clientX - r2.left;
        pressedOffsetX = e.clientX - c.left - r2.left;
      });
    };
    for (let index = 0; index < children.length; index++) {
      children[index].setWidth(percentWidth(1));
      if (index + 1 < children.length) {
        containerDiv.addChildren([children[index], resizer()]);
      } else {
        containerDiv.addChildren([children[index]]);
      }
    }
    return containerDiv;
  }
  function verticalResizer(children) {
    const containerDiv = new container([]).setHeight(percentHeight(1)).setWidth(percentWidth(1)).applyStyle(["display: flex;", "flex-direction: column;"]);
    let resizer = () => {
      var pressed = false;
      var pressedOffsetY = 0;
      document.addEventListener("pointerup", () => {
        pressed = false;
      });
      let r = new button([]);
      document.addEventListener("pointermove", (e) => {
        if (pressed) {
          const indexOfSelf = containerDiv.children.indexOf(r);
          const above = containerDiv.children[indexOfSelf - 1];
          const below = containerDiv.children[indexOfSelf + 1];
          const targetHeight = above.height + below.height;
          const newHeightOfAbove = e.clientY - pressedOffsetY;
          const newHeightOfBelow = targetHeight - newHeightOfAbove + r.height;
          const aboveToBelowHeightRatio = newHeightOfAbove / newHeightOfBelow;
          const currentShareOfAboveAndBelow = above.heightExpression(above).lengthOfShared + below.heightExpression(below).lengthOfShared;
          const newAboveSharedRatio = currentShareOfAboveAndBelow / 2 * aboveToBelowHeightRatio;
          console.log(newAboveSharedRatio);
          above.setHeight(px(newHeightOfAbove));
          containerDiv.updateDimensions();
        }
      });
      return r.addEventListener("click", (self) => {
        let d = self.children[0];
        d.content = "wow well done";
        console.log(d);
        d.rerender();
      }).setWidth(percentWidth(1)).setHeight(px(5)).addEventListener("pointerdown", (self, e) => {
        pressed = true;
        const c = containerDiv.htmlNode.getBoundingClientRect();
        const r2 = self.htmlNode.getBoundingClientRect();
        console.log(c, r2, e.clientY);
        pressedOffsetY = e.clientY - c.top - r2.top;
      });
    };
    for (let index = 0; index < children.length; index++) {
      children[index].setWidth(percentWidth(1));
      if (index + 1 < children.length) {
        containerDiv.addChildren([children[index], resizer()]);
      } else {
        containerDiv.addChildren([children[index]]);
      }
    }
    return containerDiv;
  }
  var app = new appFrwkNode([
    verticalResizer([
      new button([new appFrwkTextNode("press me for rewards")]).addEventListener("click", (self) => {
        let d = self.children[0];
        d.content = "wow well done";
        console.log(d);
        d.rerender();
      }).setHeight(shared(1)),
      horizontalResizer([
        new button([new appFrwkTextNode("press me for rewards")]).addEventListener("click", (self) => {
          let d = self.children[0];
          d.content = "wow well done";
          console.log(d);
          d.rerender();
        }).setHeight(shared(1)),
        new button([new appFrwkTextNode("press me for rewards")]).addEventListener("click", (self) => {
          let d = self.children[0];
          d.content = "wow well done";
          console.log(d);
          d.rerender();
        }).setHeight(shared(1))
      ]).setHeight(shared(1))
    ])
  ]);
  renderApp(app, document.body);
})();
