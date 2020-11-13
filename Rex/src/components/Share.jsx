import React from "react";

const Share = () => {
  return (
    <>
      <div className="row ">
        <div className="col-2 align-self-center">
          <i className="fa fa-bars" />
        </div>
        <div className="col">
          <div className="row">
            <div className="col-3">
              <span className="sharetype">ITOT</span>
              <br />
              <span className="price">$150</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Share;
