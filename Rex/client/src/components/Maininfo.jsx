import React from "react";

const MainInfo = (props) => {
  return (
    <>
      {props.bsData.map((data) => (
        <>
          <div className="border border-gray p-1 m-1">
            <div className="row">
              <div className="col-8 small">
                <i className="fa fa-box" />
                Quantity
              </div>
              <div className="col-2 small">{data.quantity}</div>
            </div>
            <div className="row">
              <div className="col-8 small">
                <i className="fas fa-at" />
                Avg-Cost
              </div>
              <div className="col-1 small">${data.avgcost}</div>
            </div>
            <div className="row">
              <div className="col-8 small">
                <i className="fas fa-money-check-alt" />
                Invested Amt
              </div>
              <div className="col-1 small">${data.investamt}</div>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default MainInfo;
