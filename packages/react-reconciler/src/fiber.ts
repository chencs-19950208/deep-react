import { Props, Key, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';

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
  ref: Ref;

  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    this.tag = tag;
    this.key = key;

    // HostComponent <div> stateNode = div
    this.stateNode = null;

    // FunctionComponent = () => {}
    this.type = null;


    // 构成树状结构
    this.return = null;
    this.sibling= null;
    this.child = null;
    this.index = 0;
    
    this.ref = null;

    // 作为工作单元
    this.pendingProps = pendingProps;
    this.memoizedProps = null;
  }
}