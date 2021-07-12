import React from "react";
import { CacheContextOptions } from "./type";

/** 缓存上下文 */
const CacheContext = React.createContext<CacheContextOptions>({
  mount() {},
  cacheStates: {},
  dispatch() {},
});

export default CacheContext;
