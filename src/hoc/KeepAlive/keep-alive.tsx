import { useContext, useRef, useEffect } from "react";
import { CacheTypes, KeepAliveHOCProps } from "./typings.d";
import CacheContext from "./cache-context";

const keepAlive = (
  CacheComponent: () => JSX.Element,
  CacheProps: KeepAliveHOCProps
) => {
  const { cacheId, isScroll = false } = CacheProps;

  return (props: any) => {
    const { mount, cacheStates, dispatch, handleScroll } =
      useContext(CacheContext);
    const ref = useRef<HTMLDivElement>(null);

    /** 处理滑动缓存 */
    useEffect(() => {
      if (isScroll && ref && handleScroll) {
        ref.current?.addEventListener(
          "scroll",
          handleScroll.bind(null, cacheId),
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
            // if (cacheState.scrolls && cacheState.scrolls[dom]) {
            //   dom.scrollTop = cacheState.scrolls[dom];
            // }
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
