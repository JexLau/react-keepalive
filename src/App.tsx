import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Form from "./components/Form";
import List from "./components/List";
import Home from "Home";

import { KeepAliveProvider, KeepAliveHOC } from "./hoc/KeepAlive";
const KeepAliveHome = KeepAliveHOC(Home, { cacheId: "Home" });
const KeepAliveUserList = KeepAliveHOC(List, {
  cacheId: "UserList",
  // scroll: true,
});
const KeepAliveUserForm = KeepAliveHOC(Form, { cacheId: "UserForm" });

function App() {
  return (
    <Router>
      <KeepAliveProvider>
        <div
          style={{
            display: "flex",
          }}
        >
          <h1>
            <Link to="/" className="menu">
              我是首页
            </Link>
          </h1>
          <h1>
            <Link to="/list" className="menu">
              用户管理
            </Link>
          </h1>
        </div>
        <Switch>
          <Route path={"/"} exact component={KeepAliveHome} />
          <Route path={"/list"} component={KeepAliveUserList} />
          <Route path={"/form"} component={KeepAliveUserForm} />
        </Switch>
      </KeepAliveProvider>
    </Router>
  );
}

export default App;
