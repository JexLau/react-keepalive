import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { KeepAliveProvider, KeepAliveHOC } from "../.";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Form from "./components/Form";
import List from "./components/List";
import Home from "./components/Home";
import "./index.less"

const KeepAliveHome = KeepAliveHOC(Home, { cacheId: "Home" });
const KeepAliveUserList = KeepAliveHOC(List, {
  cacheId: "UserList",
  isScroll: true,
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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
