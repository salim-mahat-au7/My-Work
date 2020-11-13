import React from "react";

const MarketValue = () => {
  return (
    <>
      <div className="row mt-2">
        <div className="col-7 small">Market Value</div>
        <div className="col-3 small">$9542.56</div>
      </div>
      <div className="row">
        <div className="col-9 small">% of portfolio values</div>
        <div className="col-3 small">40%</div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="progress">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: "10%" }}
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketValue;
