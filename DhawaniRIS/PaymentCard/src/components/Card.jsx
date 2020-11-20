import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Lable from "./Lable";
import { addCardData } from "../Redux/action/cardAction";

//
const Card = () => {
  const dispatch = useDispatch();
  //state
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [third, setThird] = useState();
  const [fourth, setFourth] = useState();
  //refs
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const fourthRef = useRef(null);
  const submitRef = useRef(null);
  //
  useEffect(() => {
    firstRef.current.focus();
  }, []);
  //
  const formSubmitHandel = (e) => {
    e.preventDefault();
    const card = `${first}${second}${third}${fourth}`;
    console.log(card.length);
    if (card.length === 16) {
      dispatch(addCardData(card));
      alert("Your Card Is Accepted");
    } else {
      alert("Card Number Should Be 16 Digits.!");
    }
  };
  //
  const firstChangeHandel = (e) => {
    const firData = e.target.value;

    if (firData.length === 16) {
      const val = e.target.value.match(/.{1,4}/g);
      fourthRef.current.focus();
      setFirst(val[0]);
      setSecond(val[1]);
      setThird(val[2]);
      setFourth(val[3]);
    }

    if (firData.length === 4) {
      secondRef.current.focus();
    }

    if (firData.length === 0) {
      firstRef.current.focus();
    }
  };
  //
  const secondChangeHandel = (e) => {
    const secData = e.target.value;
    if (secData.length === 4) {
      thirdRef.current.focus();
    }
    if (secData.length === 0) {
      firstRef.current.focus();
    }
  };
  //
  const thirdChangeHandel = (e) => {
    const thiData = e.target.value;
    if (thiData.length === 4) {
      fourthRef.current.focus();
    }
    if (thiData.length === 0) {
      secondRef.current.focus();
    }
  };
  //
  const fourthChangeHandel = (e) => {
    const forData = e.target.value;
    if (forData.length === 4) {
      submitRef.current.focus();
    }
    if (forData.length === 0) {
      thirdRef.current.focus();
    }
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <Lable />
          <form onSubmit={formSubmitHandel}>
            <div>
              <input
                type="text"
                onChange={(e) => firstChangeHandel(e)}
                ref={firstRef}
                value={first}
                required
              />
              <input
                type="text"
                maxLength="4"
                size="4"
                onChange={(e) => {
                  secondChangeHandel(e);
                  setSecond(e.target.value);
                }}
                ref={secondRef}
                value={second}
                required
              />
              <input
                type="text"
                maxLength="4"
                size="4"
                onChange={(e) => {
                  thirdChangeHandel(e);
                  setThird(e.target.value);
                }}
                ref={thirdRef}
                value={third}
                required
              />
              <input
                type="text"
                maxLength="4"
                size="4"
                onChange={(e) => {
                  fourthChangeHandel(e);
                  setFourth(e.target.value);
                }}
                ref={fourthRef}
                value={fourth}
                required
              />
            </div>
            <button className="btn" ref={submitRef} type="submit">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Card;
