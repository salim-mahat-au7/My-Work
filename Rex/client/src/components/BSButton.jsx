import React from "react";

const BSButton = (props) => {
  return (
    <>
      {props.cbsData.map((data) => (
        <div className="row mt-2">
          <div className="col-2 mb-1 mt-1 ml-3">
            <button className="btn btn-org btn-sm ">BUY</button>
            <button className="btn btn-org btn-sm mt-1 ">SELL</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default BSButton;
