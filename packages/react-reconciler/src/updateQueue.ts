import { Action } from 'shared/ReactTypes';

// 更新结构类型定义
export interface Update<State> {
	action: Action<State>;
}

// 更新池结构类型定义
export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
}

// 初始化更新
export const createUpdate = <State>(action: Action<State>): Update<State> => {
	return {
		action
	};
};

// 创建更新池
export const createUpdateQueue = <State>() => {
	return {
		shared: {
			pending: null
		}
	} as UpdateQueue<State>;
};

// 插入更新
export const enqueueUpdate = <State>(
	updateQueue: UpdateQueue<State>,
	update: Update<State>
) => {
	updateQueue.shared.pending = update;
};

// 消费更新
export const processUpdateQueue = <State>(
	baseState: State, // 初始状态
	pendingUpdate: Update<State> // 更新状态
): { memoizedState: State } => {
	// 初始结果
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};
	/**
	 * 两种情况
	 * baseState 1 update 2 => memoizedState 2
	 * baseState 1 update (x) => 2x => memoizedState 4
	 */
	const action = pendingUpdate.action;
	if (action instanceof Function) {
		result.memoizedState = action(baseState);
	} else {
		result.memoizedState = action;
	}

	return result;
};
