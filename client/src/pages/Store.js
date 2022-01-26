import React, { useRef, useState, useEffect } from "react";
import data from "../data.js";
import types from "../types.js";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.js";
import Backdrop from "./Backdrop.js";
import logo from "./logos/vev.png";
import { useGlobalContext } from "../context.js";

const Store = () => {
  const [da, setDa] = useState(0);
  const nav = useNavigate();
  const { setCheck, setRedirect, updated, fetchData, addToCart } =
    useGlobalContext();

  const [videos, setVideos] = useState(data);

  useEffect(() => {
    setRedirect(false);
    setCheck(false);
  }, []);
  useEffect(() => {
    fetchData();
  }, [updated]);

  const filterVideos = (type) => {
    const newVideos = data.filter((video) => {
      return video.type.toUpperCase().includes(type.toUpperCase());
    });
    if (type === "All") {
      setVideos(data);
    } else {
      setVideos(newVideos);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <Backdrop></Backdrop>

      <h2 style={{ textAlign: "Center" }}>
        <img className="imgL" width="400" src={logo} alt="" />
        <div className="btns-top">
          {types.map((type, i) => {
            return (
              <button
                className={`cat-btn ${i === da && "active-btn"}`}
                onClick={() => {
                  filterVideos(type);
                  setDa(i);
                }}
              >
                {type}
              </button>
            );
          })}
        </div>
      </h2>
      <section className="vid-container">
        <div className="wrapper">
          {videos.map((x, i) => {
            return (
              <div key={i} className="video">
                <div className="title-head">
                  <h4 className="title">{x.title}</h4>
                </div>
                <div className="wrapper" key={i}>
                  <iframe
                    className="vid0"
                    style={{ boxShadow: "2px 5px 10px black" }}
                    src={x.url}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen="true"
                  ></iframe>
                </div>
                <div className="item-footer">
                  <h4>${x.price}</h4>
                  <button
                    onClick={() => {
                      addToCart(x);
                      nav("/cart");
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Store;
