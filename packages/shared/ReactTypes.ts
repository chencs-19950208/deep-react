export type Type = any;
export type Key = any;
export type Ref = any;
export type Props = any;
export type ReactElementType = any;

export interface ReactElement {
	$$typeof: symbol | number;
	type: ReactElementType;
	key: Key;
	ref: Ref;
	props: Props;
	__mark: string;
}

// 触发更新方式的类型 兼容老旧触发方式
export type Action<State> = State | ((prevState: State) => State);
