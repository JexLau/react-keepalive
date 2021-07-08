import { Link } from "react-router-dom";

const List = () => {
  const list = [...new Array(100).keys()];
  return (
    <div style={{ height: "500px", overflow: "scroll" }}>
      <h2>我是用户管理-列表页</h2>
      <ul>
        {list.map((item, index) => {
          return (
            <li key={index}>
              <span style={{ marginRight: 50 }}>我是用户{item + 1}</span>
              <Link to="/form">
                <span style={{ marginRight: 50 }}>新增用户</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
