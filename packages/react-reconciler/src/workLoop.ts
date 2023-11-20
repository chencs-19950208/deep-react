import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode } from './fiber';

let workInProgress: FiberNode | null = null; // 记录当前正在工作的fiberNode

// 初始化方法，赋值第一个fiberNode
function prepareFreshStack(fiber: FiberNode) {
	workInProgress = fiber;
}

export function renderRoot(root: FiberNode) {
	// 初始化，让 workInProgress 指向第一个fiberNode节点
	prepareFreshStack(root);

	// 开始工作
	do {
		try {
			workLoop();
			break;
		} catch (e) {
			// 出现错误，抛出错误以及充值workInProgress
			console.warn('workLoop 发生错误', e);
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
