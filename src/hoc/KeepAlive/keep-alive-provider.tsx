import { useCallback, useReducer } from "react";
import CacheContext from "./cache-context";
import CacheReducer from "./cache-reducer";
import { CacheMountProps, CacheTypes } from "./typings.d";

const KeepAliveProvider: React.FC = (props) => {
  const [cacheStates, dispatch] = useReducer(CacheReducer, {});

  /** 处理组件挂载 */
  const mount = useCallback(
    ({ cacheId, component }: CacheMountProps) => {
      if (cacheStates[cacheId]) {
        const cacheState = cacheStates[cacheId];
        /** 如果组件已存在销毁状态，先删 dom 再新建，否则直接新建 */
        if (cacheState.status === CacheTypes.DESTROY) {
          const doms = cacheState.doms || [];
          doms.forEach((dom) => dom?.parentNode?.removeChild(dom));
          dispatch({
            type: CacheTypes.CREATE,
            payload: { cacheId, component },
          });
        }
      } else {
        dispatch({
          type: CacheTypes.CREATE,
          payload: { cacheId, component },
        });
      }
    },
    [cacheStates]
  );

  /** 处理滑动缓存 */
  const handleScroll = useCallback(
    (cacheId, { target }) => {
      if (cacheStates[cacheId]) {
        const scrolls = cacheStates[cacheId].scrolls;
        if (scrolls) {
          scrolls[target] = target.scrollTop;
        }
      }
    },
    [cacheStates]
  );

  return (
    <CacheContext.Provider
      value={{ mount, cacheStates, dispatch, handleScroll }}
    >
      {props.children}
      {Object.values(cacheStates)
        .filter((cacheState) => cacheState.status !== CacheTypes.DESTROY)
        .map(({ cacheId, component }) => {
          return (
            <div
              id={`cache_${cacheId}`}
              key={cacheId}
              ref={(dom) => {
                const cacheState = cacheStates[cacheId];
                if (
                  dom &&
                  (!cacheState.doms?.length ||
                    cacheState.status === CacheTypes.DESTROY)
                ) {
                  const doms = Array.from(dom.childNodes);
                  dispatch({
                    type: CacheTypes.CREATED,
                    payload: {
                      cacheId,
                      doms,
                    },
                  });
                }
              }}
            >
              {component}
            </div>
          );
        })}
    </CacheContext.Provider>
  );
};

export default KeepAliveProvider;
