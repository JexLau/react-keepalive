import React, { useContext, useRef, useEffect } from 'react';
import { CacheTypes, KeepAliveHOCProps } from './type';
import CacheContext from './cache-context';

const keepAlive = function <T>(
  CacheComponent: (props: T) => JSX.Element,
  CacheProps: KeepAliveHOCProps
) {
  const { cacheId, isScroll = false } = CacheProps;

  return (props: T) => {
    const { mount, cacheStates, dispatch, handleScroll } = useContext(
      CacheContext
    );
    const ref = useRef<HTMLDivElement>(null);

    /** 处理滑动缓存 */
    useEffect(() => {
      if (isScroll && handleScroll) {
        ref.current?.addEventListener(
          'scroll',
          // 预定义参数 cacheId
          handleScroll.bind<null, any, any>(null, cacheId),
          true
        );
      }
    }, [handleScroll]);

    /**  */
    useEffect(() => {
      const cacheState = cacheStates[cacheId];
      if (
        cacheState &&
        cacheState.doms &&
        cacheState.status !== CacheTypes.DESTROY
      ) {
        const doms = cacheState.doms;
        doms.forEach((dom) => ref?.current?.appendChild(dom));
        if (isScroll) {
          doms.forEach((dom) => {
            if (cacheState.scrollTop) {
              (dom as Element).scrollTop = cacheState.scrollTop;
            }
          });
        }
      } else {
        mount({
          cacheId,
          component: <CacheComponent {...props} dispatch={dispatch} />,
        });
      }
    }, [cacheStates, dispatch, mount, props]);

    return <div id={`keepalive_${cacheId}`} ref={ref} />;
  };
};
export default keepAlive;
