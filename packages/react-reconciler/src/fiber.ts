import { Props, Key, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';

// FiberNode 节点定义，一个fiberNode 就是一个工作单元
// JSX => React Element => fiberNode => DOMElement 
// React Element 与fiberNode,进行对比，产生子fiberNode
/*
	众多fiberNode节点按照层级关系构成一个树，一共会存在两个树，
	1.一个是跟真实UI对应的fiberNode树 （current树）
	2.触发更新之后，正在reconciler 中正在计算的fiberNode树 （workInProgress 树）
	workInProgress 更新计算完成之后，就变成current树。（双缓存机制）
	遍历React Element 遵循 DFS(深度优先遍历的方式) 递归，一层一层往下，
	有子节点，遍历子节点，没有子节点，就遍历兄弟节点
	递方法： beginWork
	归方法：completeWork
*/
export class FiberNode {
	tag: WorkTag;
	key: Key;
	stateNode: any;
	type: any;
	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;
	pendingProps: Props;
	memoizedProps: Props | null;
	alternate: FiberNode | null;
	ref: Ref;

	flags: Flags; // 存储着副作用标记

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		this.tag = tag; // 实例
		this.key = key;

		// HostComponent <div> stateNode = div
		this.stateNode = null;

		// FunctionComponent = () => {} fiberNode节点类型
		this.type = null;

		// 构成树状结构
		this.return = null; // 指向父fiberNode 
		this.sibling = null; // 指向兄弟fiberNode
		this.child = null; // 指向子fiberNode
		this.index = 0; // 多个同级节点，index标识顺序

		this.ref = null;

		// 作为工作单元
		this.pendingProps = pendingProps; // 这个节点工作单元刚开始工作的props
		this.memoizedProps = null; // 工作完之后，工作单元应该的props 

		this.alternate = null; // 标识current树 workInProgress树

		// 副作用
		this.flags = NoFlags;
	}
}
