/** 缓存的状态 */
export enum CacheTypes {
  /** 创建 */
  CREATE = 'CREATE',
  /** 已创建 */
  CREATED = 'CREATED',
  /** 销毁 */
  DESTROY = 'DESTROY',
}

export interface CacheReducerAction {
  type: CacheTypes;
  payload: CacheContextOptions['cacheStates']['cacheId'];
}

/** keep-alive 高阶组件 props */
export interface KeepAliveHOCProps {
  /** 缓存组件的id */
  cacheId: string;
  /** 是否滚动 */
  isScroll?: boolean;
}

/** 挂载 mount props */
export interface CacheMountProps {
  /** 缓存 id */
  cacheId: string;
  /** 缓存的组件 */
  component: JSX.Element;
}

/** 缓存上下文 options */
export interface CacheContextOptions {
  /** 挂载时的操作 */
  mount(props: CacheMountProps): void;
  /** 缓存状态 */
  cacheStates: {
    /** 缓存组件 */
    [cacheId: string]: {
      /** 缓存组件 id */
      cacheId: string;
      /** 缓存的组件 */
      component?: JSX.Element;
      /** 从ref获取到的需要缓存的 dom */
      doms?: Array<ChildNode>;
      /** 缓存 dom 的状态 */
      status?: CacheTypes;
      /** 缓冲滚动的scrollTop */
      scrollTop?: number;
    };
  };
  /** dispatch */
  dispatch: React.Dispatch<CacheReducerAction>;
  /** 缓存的滑动位置 */
  handleScroll?: (
    cacheId: string,
    { target }: { target: HTMLDivElement }
  ) => void;
}
