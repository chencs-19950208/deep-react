export type Flags = number;

export const NoFlags = 0b0000001; // 未标记
export const Placement = 0b0000010; // 节点标记为新增
export const Update = 0b0000100; // 节点标记为更新属性
export const ChildDeletion = 0b0001000; // 标记为删除子节点
