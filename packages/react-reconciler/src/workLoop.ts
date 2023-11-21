import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode, FiberRootNode, createWorkInProgress } from './fiber';
import { HostRoot } from './workTags';

let workInProgress: FiberNode | null = null; // 记录当前正在工作的fiberNode

// 初始化方法，赋值第一个fiberNode
function prepareFreshStack(root: FiberRootNode) {
	// workInProgress = fiber;
	workInProgress = createWorkInProgress(root.current, {});
}

// fiber 中调度更新
export function scheduleUpdateOnFiber(fiber: FiberNode) {
	// TODO 调度功能
	const root = markUpdateFromToFiber(fiber);
	renderRoot(root);
}

// 从更新节点，一直递归到fiberRootNode. (根节点)
export function markUpdateFromToFiber(fiber: FiberNode) {
	let node = fiber;
	let parent = fiber.return; // 父节点

	while (parent !== null) {
		node = parent;
		parent = node.return;
	}

	if (node.tag === HostRoot) {
		return node.stateNode; // 根节点
	}

	return null;
}

export function renderRoot(root: FiberRootNode) {
	// 初始化，让 workInProgress 指向第一个fiberNode节点
	prepareFreshStack(root);

	// 开始工作
	do {
		try {
			workLoop();
			break;
		} catch (e) {
			// 出现错误，抛出错误以及充值workInProgress
			if (__DEV__) {
				// 开发环境
				console.warn('workLoop 发生错误', e);
			}
			workInProgress = null;
		}
	} while (true);
}

// 工作循环 包含递归的阶段
function workLoop() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}

//
function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber); // 子fiberNode， 或者 null ,null代表见底了

	// beginWork执行完了之后代表这个节点执行完了需要生成最终的节点props
	fiber.memoizedProps = fiber.pendingProps;

	// 代表已经到了最底层的节点,代表需要进入归阶段
	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		// @ts-ignore
		workInProgress = next; // workInProgress 记录，将继续执行workLoop
	}
}

// 没有子节点，就遍历兄弟节点, 否则向上找父节点
function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;

	do {
		completeWork(fiber);
		const sibling = node.sibling;

		// 代表有兄弟节点,继续遍历兄弟节点
		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}

		// 向上找到父节点, 继续遍历
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}
