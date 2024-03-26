"use strict";
const content = () => {
    return CSReact.createElement(React.Fragment, null,
        CSReact.createElement("a", { href: "www.baidu.com" }, "linkclear"));
};
console.log(window);
console.log(JSON.stringify(content, null, 2));
