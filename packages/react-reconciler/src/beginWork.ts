// 递归中的 递阶段
import { FiberNode } from './fiber';
import { UpdateQueue, processUpdateQueue } from './updateQueue';
import { HostComponent, HostRoot, HostText } from './workTags';

// 返回子fiberNode
export const beginWork = (wip: FiberNode) => {
	// ReactElement 与 fiberNode 比较, 生成子fiberNode
	switch(wip.tag) {
		case HostRoot:
			/**
			 * 计算状态最新值
			 * 创建子fiberNode
			 */
		
			return updateHostRoot(wip);
		case HostComponent:
		case HostText:
			return null;
		default: 
			if(__DEV__) {
				console.warn('beginWork 未实现的类型');
			}
	};
};

function updateHostRoot(wip: FiberNode) {
	const baseState = wip.memoizedState;
	const updateQueue = wip.updateQueue as UpdateQueue<Element>;
	const pending = updateQueue.shared.pending;
	updateQueue.shared.pending = null;
	// @ts-ignore TODO
	const { memoizedState } = processUpdateQueue(baseState, pending);
	wip.memoizedState = memoizedState;

	const nextChild = wip.memoizedState;
	// @ts-ignore TODO
	reconcilerChildren(wip, nextChild);
	return wip.child;
};

function updateHostComponent(wip: FiberNode) {
	const nextProps = wip.memoizedProps;
	const nextChild = nextProps.children;
	// @ts-ignore TODO
	reconcilerChildren(wip, nextChild);

	return wip.child;
}

function reconcilerChildren(wip: FiberNode) {
	const nextProps = wip.pendingProps;
	// const nextChildren = nextProps.
};
