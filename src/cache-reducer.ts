import { CacheContextOptions, CacheReducerAction, CacheTypes } from './type';

/** 接收当前应用的state和触发的动作action，计算并返回最新的state */
const reducer = (
  cacheStates: CacheContextOptions['cacheStates'],
  { type, payload }: CacheReducerAction
) => {
  switch (type) {
    /** 新建 */
    case CacheTypes.CREATE:
      return {
        ...cacheStates,
        [payload.cacheId]: {
          cacheId: payload.cacheId,
          component: payload.component,
          scrollTop: 0,
          status: CacheTypes.CREATE,
        },
      };

    /** 已创建 */
    case CacheTypes.CREATED:
      return {
        ...cacheStates,
        [payload.cacheId]: {
          ...cacheStates[payload.cacheId],
          scrollTop: payload.scrollTop,
          doms: payload.doms,
          status: CacheTypes.CREATED,
        },
      };

    /** 销毁 */
    case CacheTypes.DESTROY:
      return {
        ...cacheStates,
        [payload.cacheId]: {
          ...cacheStates[payload.cacheId],
          scrollTop: 0,
          status: CacheTypes.DESTROY,
        },
      };

    default:
      return cacheStates;
  }
};

export default reducer;
