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

// // jsx 方法
// export const jsx = (type: ElementType, config: any, ...children) => {
//   let key: Key = null;
//   const props: Props = {};
//   let ref: Ref = null;

//   for(const prop in config) {
//     const val = config[prop];

//     if (prop === 'key') {
//       if (val !== undefined) {
//         key = '' + val;
//       }

//       continue;
//     }

//     if (prop === 'ref') {
//       if (val !== undefined) {
//         ref = val;
//       }

//       continue;
//     }

//     // 属于自己的属性
//     if ({}.hasOwnProperty.call(config, prop)) {
//       props[prop] = val;
//     }
//   }

//   const childrenLength = children.length;

// }
