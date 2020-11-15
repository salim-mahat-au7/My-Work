import React from "react";

const MarketValue = (props) => {
  return (
    <>
      {props.mvsData.map((data) => (
        <div>
          <div className="border border-gray p-1 m-1">
            <div className="row mt-2">
              <div className="col-7 small">Market Value</div>
              <div className="col-3 small">${data.price * data.quantity}</div>
            </div>
            <div className="row">
              <div className="col-9 small">% of portfolio values</div>
              <div className="col-3 small">{data.portvalue}%</div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "100%" }}
                    aria-valuenow={data.portvalue}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MarketValue;
