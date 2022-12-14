import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ReactElement,
	ElementType
} from 'shared/ReactTypes';

// ReactElement
const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'chencs'
	};

	return element;
};

// jsx 方法
export const jsx = (type: ElementType, config: any, ...children: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];

		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}

			continue;
		}

		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}

			continue;
		}

		// 属于自己的属性
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	const childrenLength = children.length;

	if (childrenLength) {
		// length = 1 child, length > 2 [child, child, child.....]
		if (childrenLength === 1) {
			props.children = children[0];
		} else {
			props.children = children;
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx;
