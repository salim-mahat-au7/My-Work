import React from "react";

const Company = (props) => {
  return (
    <>
      {props.csData.map((data) => (
        <div className="border border-gray p-1 m-1">
          <div className="row mt-1">
            <div className="col">
              <span className="cname">iShares</span>
              <br />
              <span className="sharetype">{data.scrip}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Company;
