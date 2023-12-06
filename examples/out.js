(() => {
  // ../node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }

  // ../node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
  }

  // ../node_modules/uuid/dist/esm-browser/native.js
  var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native_default = {
    randomUUID
  };

  // ../node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var v4_default = v4;

  // ../lib.ts
  var styleGroup = class {
    constructor(styles, className) {
      this.members = [];
      this.checksum = 0;
      this.className = v4_default();
      this.styles = styles;
      if (className) {
        this.className = className;
      }
    }
    set(style) {
      this.styles.push(style);
      this.checksum++;
    }
    getCss() {
      var s = "";
      for (let i of this.styles) {
        s += `${i[0]} {${i[1]}}`;
      }
      return s;
    }
  };
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
      this.styleGroups = [];
      this.flag = /* @__PURE__ */ new Map([]);
      this.changes = [];
      this.children = [];
      this.width = -1;
      this.height = -1;
      this.children = children;
      for (let i of children) {
        i.parent = this;
      }
    }
    setFlag(key, val) {
      this.flag.set(key, val);
      return this;
    }
    addClass(className) {
      this.changes.push(() => {
        this.htmlNode.classList.add(className);
      });
      return this;
    }
    hasClass(className) {
      if (this.htmlNode) {
        return this.htmlNode.classList.contains(className);
      }
      return false;
    }
    toggleClass(className) {
      this.changes.push(() => {
        this.htmlNode.classList.toggle(className);
      });
    }
    removeClass(className) {
      this.changes.push(() => {
        this.htmlNode.classList.remove(className);
      });
    }
    applyStyle(styles) {
      this.styles.push(styles);
      this.changes.push(() => {
        this.htmlNode.style.cssText += computeStyles([styles]);
      });
      return this;
    }
    addToStyleGroup(group) {
      this.changes.push(() => {
        this.htmlNode.classList.add(group.className);
      });
      this.styleGroups.push(group);
      group.members.push(this);
      return this;
    }
    addEventListener(event, callback) {
      if (this.htmlNode) {
        this.htmlNode.addEventListener(event, (e) => callback(this, e));
      } else {
        this.onMountQueue.push(() => {
          this.htmlNode.addEventListener(event, (e) => callback(this, e));
        });
      }
      return this;
    }
    addChildren(children) {
      for (let i of children) {
        i.parent = this;
        this.children.push(i);
        this.changes.push(() => {
          i.render(this.htmlNode);
        });
      }
    }
    removeChild(child) {
      this.children.splice(this.children.indexOf(child));
      this.changes.push(() => {
        this.htmlNode.removeChild(child.htmlNode);
      });
    }
    render(target) {
      this.updateDimensionsBlindly();
      let element = document.createElement("div");
      for (let i of this.children) {
        i.render(element);
      }
      this.htmlNode = element;
      this.htmlNode.style.cssText = computeStyles(this.styles);
      addStyleGroupStylesToDOM(this.styleGroups);
      for (let i of this.onMountQueue) {
        i();
      }
      this.onMountQueue = [];
      target.appendChild(element);
    }
    renderNewChildren(children) {
      this.addChildren(children);
      computeDimensions(this);
      if (this.htmlNode) {
        for (let i of children) {
          i.render(this.htmlNode);
        }
      }
    }
    rerender() {
      computeDimensions(this);
      this.htmlNode.style.cssText = computeStyles(this.styles);
      this.updateDimensionsBlindly();
      addStyleGroupStylesToDOM(this.styleGroups);
      for (let i of this.children) {
        if (i.htmlNode || i.textNode) {
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
        i.updateDimensions();
      }
    }
    updateDimensionsBlindly() {
      const d = () => {
        if (this.width > 0) {
          this.htmlNode.style.width = this.width + "px";
        }
        if (this.height > 0) {
          this.htmlNode.style.height = this.height + "px";
          console.log("heihgt", this.htmlNode);
        }
      };
      if (this.htmlNode) {
        d();
        console.log("updating style dimensions", this.height);
      } else {
        this.onMountQueue.push(d);
      }
      for (let i of this.children) {
        i.updateDimensions();
      }
    }
    setWidth(expression, test) {
      if (test) {
      }
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
    lightRerender() {
      for (let i of this.changes) {
        i();
      }
      this.changes = [];
      for (let i of this.children) {
        i.lightRerender();
      }
    }
    applyLastChange() {
      if (this.changes.length > 0) {
        this.changes[this.changes.length - 1]();
      }
      this.changes.pop();
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
      i.height = i.heightExpression(i).lengthOfShared * heightOfStandardSharedHeight;
    }
    for (let i of allDimensionSharers) {
      computeDimensions(i);
    }
  }
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
  var allStyleGroups = [];
  function addStyleGroupStylesToDOM(styleGroups) {
    for (let s of styleGroups) {
      var exists = false;
      for (let index = 0; index < allStyleGroups.length; index++) {
        if (s == allStyleGroups[index]) {
          if (s.checksum != allStyleGroups[index].checksum) {
            document.head.querySelector(`#${s.className}`).innerHTML = s.getCss();
          }
          exists = true;
        }
      }
      if (!exists) {
        let styleElement = document.createElement("style");
        styleElement.id = s.className;
        styleElement.innerHTML = s.getCss();
        document.head.appendChild(styleElement);
        allStyleGroups.push(s);
      }
    }
  }
  var resizeElement = document.createElement("div");
  resizeElement.style.cssText = `
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: larger;
    background-color: white;
`;
  resizeElement.innerText = "Resizing";
  document.body.appendChild(resizeElement);
  function renderApp(node, target) {
    node.applyStyle(["width: 100%;", "height: 100%; overflow: hidden;"]);
    node.width = document.body.clientWidth;
    node.height = document.body.clientHeight;
    console.log(node.height);
    const onResize = () => {
      resizeElement.style.display = "none";
      node.width = document.body.clientWidth;
      node.height = document.body.clientHeight;
      node.updateDimensions();
    };
    var doit;
    addEventListener("resize", () => {
      resizeElement.style.display = "flex";
      clearTimeout(doit);
      doit = setTimeout(onResize, 100);
    });
    computeDimensions(node);
    target.style.overflow = "hidden";
    node.render(target);
  }

  // ../elements.ts
  var button = class extends appFrwkNode {
    constructor() {
      super(...arguments);
      this.name = "button";
      this.styles = [];
    }
    render(target) {
      computeDimensions(this.parent);
      this.updateDimensionsBlindly();
      let element = document.createElement("button");
      for (let i of this.children) {
        i.render(element);
      }
      this.htmlNode = element;
      this.htmlNode.style.cssText = computeStyles(this.styles);
      addStyleGroupStylesToDOM(this.styleGroups);
      for (let i of this.onMountQueue) {
        i();
      }
      this.onMountQueue = [];
      target.appendChild(element);
    }
    rerender() {
      computeDimensions(this.parent);
      this.htmlNode.style.cssText = computeStyles(this.styles);
      this.updateDimensionsBlindly();
      addStyleGroupStylesToDOM(this.styleGroups);
      for (let i of this.children) {
        if (i.htmlNode || i.textNode) {
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
      computeDimensions(this.parent);
      this.updateDimensionsBlindly();
      let element = document.createElement("div");
      for (let i of this.children) {
        i.render(element);
      }
      this.htmlNode = element;
      this.htmlNode.style.cssText = computeStyles(this.styles);
      addStyleGroupStylesToDOM(this.styleGroups);
      for (let i of this.onMountQueue) {
        i();
      }
      this.onMountQueue = [];
      target.appendChild(element);
    }
    rerender() {
      computeDimensions(this.parent);
      this.htmlNode.style.cssText = computeStyles(this.styles);
      this.updateDimensionsBlindly();
      addStyleGroupStylesToDOM(this.styleGroups);
      for (let i of this.children) {
        if (i.htmlNode || i.textNode) {
          i.rerender();
        } else {
          i.render(this.htmlNode);
        }
      }
    }
  };

  // nav.ts
  function navbar() {
    return new container([]).setHeight(px(20)).setWidth(percentWidth(1));
  }

  // resizers.ts
  var resizerThickness = px(1);
  var resizerHitBox = px(15);
  var resizerStyles = new styleGroup([
    [".resizer-styles", `
        outline: none;
        background-color: black;
    `]
  ], "resizer-styles");
  function horizontalResizer(children) {
    const containerDiv = new container([]).setWidth(percentWidth(1)).setWidth(percentWidth(1)).applyStyle(["display: flex;", "flex-direction: row;"]);
    let resizer = () => {
      var pressed = false;
      var pressedOffsetX = 0;
      document.addEventListener("pointerup", () => {
        pressed = false;
      });
      let r = new button([
        new container([]).applyStyle(["position: absolute;", "z-index: 2;", "background-color: transparent;", "top: 0;", "left: 50%;", "transform: translateX(-50%);"]).setHeight(percentHeight(1)).setWidth(resizerHitBox).addEventListener("pointerdown", (self, e) => {
          pressed = true;
          const c2 = containerDiv.htmlNode.getBoundingClientRect();
          const r2 = self.htmlNode.getBoundingClientRect();
          pressedOffsetX = e.clientX - c2.left - r2.left;
        })
      ]).applyStyle(["position: relative;", "overflow: visible;"]);
      document.addEventListener("pointermove", (e) => {
        if (pressed) {
          const indexOfSelf = containerDiv.children.indexOf(r);
          const left = containerDiv.children[indexOfSelf - 1];
          const right = containerDiv.children[indexOfSelf + 1];
          const targetWidth = left.width + right.width;
          var totalWidthOfAllPartsLeft = 0;
          for (let i = 0; i < indexOfSelf - 1; i++) {
            totalWidthOfAllPartsLeft += containerDiv.children[i].width;
          }
          const newWidthOfLeft = e.clientX - pressedOffsetX - totalWidthOfAllPartsLeft;
          const newWidthOfRight = targetWidth - newWidthOfLeft + r.width;
          const leftToRightWidthRatio = newWidthOfLeft / newWidthOfRight;
          const currentShareOfLeftAndRight = left.widthExpression(left).lengthOfShared + right.widthExpression(right).lengthOfShared;
          var newRightSharedRatio = currentShareOfLeftAndRight / (leftToRightWidthRatio + 1);
          var newLeftSharedRatio = currentShareOfLeftAndRight - newRightSharedRatio;
          console.log(newWidthOfLeft, newWidthOfRight);
          left.setWidth(shared(newLeftSharedRatio));
          right.setWidth(shared(newRightSharedRatio));
          containerDiv.updateDimensions();
        }
      });
      return r.addToStyleGroup(resizerStyles).setHeight(percentHeight(1)).setWidth(resizerThickness);
    };
    for (let index = 0; index < children.length; index++) {
      children[index].setHeight(percentHeight(1));
      let resizable = !children[index].flag.get("static");
      if (index + 1 < children.length) {
        if (resizable) {
          containerDiv.addChildren([children[index], resizer()]);
        } else {
          let dummyResizer = new button([]).addToStyleGroup(resizerStyles).setHeight(percentHeight(1)).setWidth(resizerThickness);
          containerDiv.addChildren([children[index], dummyResizer]);
        }
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
      let r = new button([
        new container([]).applyStyle(["position: absolute;", "z-index: 2;", "background-color: transparent;", "top: 50%;", "left: 0;", "transform: translateY(-50%);"]).setWidth(percentWidth(1)).setHeight(resizerHitBox).addEventListener("pointerdown", (self, e) => {
          pressed = true;
          const c2 = containerDiv.htmlNode.getBoundingClientRect();
          const r2 = self.htmlNode.getBoundingClientRect();
          pressedOffsetY = e.clientY - c2.top - r2.top;
        })
      ]).applyStyle(["position: relative;", "overflow: visible;"]);
      document.addEventListener("pointermove", (e) => {
        if (pressed) {
          const indexOfSelf = containerDiv.children.indexOf(r);
          const above = containerDiv.children[indexOfSelf - 1];
          const below = containerDiv.children[indexOfSelf + 1];
          const targetHeight = above.height + below.height;
          var totalHeightOfAllPartsAbove = 0;
          for (let i = 0; i < indexOfSelf - 1; i++) {
            totalHeightOfAllPartsAbove += containerDiv.children[i].height;
          }
          const newHeightOfAbove = e.clientY - pressedOffsetY - totalHeightOfAllPartsAbove;
          const newHeightOfBelow = targetHeight - newHeightOfAbove + r.height;
          const aboveToBelowHeightRatio = newHeightOfAbove / newHeightOfBelow;
          const currentShareOfAboveAndBelow = above.heightExpression(above).lengthOfShared + below.heightExpression(below).lengthOfShared;
          var newBelowSharedRatio = currentShareOfAboveAndBelow / (aboveToBelowHeightRatio + 1);
          var newAboveSharedRatio = currentShareOfAboveAndBelow - newBelowSharedRatio;
          above.setHeight(shared(newAboveSharedRatio));
          below.setHeight(shared(newBelowSharedRatio));
          containerDiv.updateDimensions();
        }
      });
      return r.addToStyleGroup(resizerStyles).setWidth(percentWidth(1)).setHeight(resizerThickness);
    };
    for (let index = 0; index < children.length; index++) {
      children[index].setWidth(percentWidth(1));
      let resizable = !children[index].flag.get("static");
      if (index + 1 < children.length) {
        if (resizable) {
          containerDiv.addChildren([children[index], resizer()]);
        } else {
          let dummyResizer = new button([]).addToStyleGroup(resizerStyles).setWidth(percentWidth(1)).setHeight(resizerThickness);
          containerDiv.addChildren([children[index], dummyResizer]);
        }
      } else {
        containerDiv.addChildren([children[index]]);
      }
    }
    return containerDiv;
  }

  // main.ts
  var c = new container([]);
  function demoButton() {
    return new button([new appFrwkTextNode("press me for rewards")]).addEventListener("click", (self) => {
      let d = self.children[0];
      d.content = "wow well done";
      d.rerender();
      c.addChildren([
        new button([new appFrwkTextNode("Hello Im a new child")]),
        new button([new appFrwkTextNode("Hello Im a 2nd new child")])
      ]);
      c.applyStyle(["color: red;"]);
      c.applyLastChange();
    }).setHeight(shared(1)).applyStyle(["outline: none;"]);
  }
  var app = new appFrwkNode([
    verticalResizer([
      navbar().setFlag("static", true),
      demoButton().setHeight(shared(1)),
      demoButton().setHeight(shared(1)),
      horizontalResizer([
        demoButton().setWidth(shared(1)),
        c.setWidth(shared(1))
      ]).setHeight(shared(1))
    ])
  ]);
  renderApp(app, document.body);
})();
