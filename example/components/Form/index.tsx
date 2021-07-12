import * as React from 'react';
import { useState } from "react";

const Form = () => {
  const [name, setName] = useState<string>();
  
  return (
    <div>
      <h2>我是用户管理-新增表单页</h2>
      <label>用户名:{name}</label>
      <input onChange={(event) => setName(event.currentTarget.value)} />
    </div>
  );
};
export default Form;
