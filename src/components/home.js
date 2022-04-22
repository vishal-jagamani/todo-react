import Addtodo from "./addtodo";
import Todolist from "./todolist";

import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const [data, setData] = useState([]);
  const [count, updateCount] = useState(0);
  const [update, setUpdate] = useState({});

  const navigate = useNavigate();

  const cookie = new Cookies();
  const cname = cookie.get("cname");

  useEffect(() => {
    if (cname === undefined) {
      navigate("/");
    }
  }, []);

  let getData = async () => {
    const url = await fetch(`https://vishal-node.herokuapp.com/getdata`);
    const data = await url.json();
    setData(data);
  };
  useEffect(() => {
    getData();
  }, [count]);

  return (
    <div className="App">
      <h1 className="h1 title p-3">TODO APP</h1>
      <div className="container body-container">
        <div className="row">
          <div className="col">
            <Addtodo updateCount={updateCount} count={count} update={update} getData={getData}/>
          </div>
          <div className="col">
            <Todolist
              data={data}
              updateCount={updateCount}
              count={count}
              setUpdate={setUpdate}
              getData={getData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
