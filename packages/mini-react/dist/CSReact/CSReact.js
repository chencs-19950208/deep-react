"use strict";
// JSX => VDOM
function createElement(type, props, ...children) {
    return {
        type,
        props: Object.assign(Object.assign({}, props), { children: children.map(child => {
                const isTextNode = typeof child === 'string' || typeof child === 'number';
                return isTextNode ? createTextNode(child) : child;
            }) }),
    };
}
;
function createTextNode(textNode) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            textNode,
            children: [],
        }
    };
}
;
const CSReact = {
    createElement,
};
window.CSReact = CSReact;
