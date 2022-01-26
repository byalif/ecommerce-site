import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context.js";
import "../navbar.css";
import Sidedraw from "./Sidedraw.js";

const Backdrop = () => {
  const [classN, setClassN] = useState("");
  const [classX, setClassX] = useState("");

  const { updated, fetchData, setShow, show } = useGlobalContext();

  useEffect(() => {
    fetchData();
  }, [updated]);
  useEffect(() => {
    if (show) {
      setClassX("showX iconX far fa-times");
      setClassN("backdrop showB");
    } else {
      setClassX("iconX far fa-times");
      setClassN("backdrop");
    }
  }, [show]);

  return (
    <div className="ha" style={{ position: "absolute" }}>
      <Sidedraw></Sidedraw>
      <div style={{ position: "fixed" }} className={classN}></div>
      <i
        onClick={() => {
          setShow(!show);
        }}
        class={classX}
      ></i>
    </div>
  );
};

export default Backdrop;
