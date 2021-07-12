import * as React from 'react';

const Home = (props) => {

  return (
    <div>
      <div>我是没什么用的首页</div>
      <div>
        <button
          onClick={() =>
            props.dispatch({
              type: "DESTROY",
              payload: { cacheId: "UserForm" },
            })
          }
        >
          重置UserAdd
        </button>
        <button
          onClick={() =>
            props.dispatch({
              type: "DESTROY",
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
