import { CacheContextOptions, CacheTypes } from "hoc/KeepAlive/typings.d";

const Home = (props: CacheContextOptions) => {

  return (
    <div className="app">
      <div>我是没什么用的首页</div>
      <div>
        <button
          onClick={() =>
            props.dispatch({
              type: CacheTypes.DESTROY,
              payload: { cacheId: "UserForm" },
            })
          }
        >
          重置UserAdd
        </button>
        <button
          onClick={() =>
            props.dispatch({
              type: CacheTypes.DESTROY,
              payload: { cacheId: "UserList" },
            })
          }
        >
          重置UserList
        </button>
      </div>
    </div>
  );
};

export default Home;
