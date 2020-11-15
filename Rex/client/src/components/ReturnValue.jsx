import React from "react";

const ReturnValue = (props) => {
  return (
    <>
      {props.rvsData.map((data) => (
        <>
          <div className="border border-gray p-1 m-1">
            <div className="row">
              <div className="col-8 small">Unrealized P&L</div>
              <div className="col-2 pr-5 small">${data.unrealizedpl}</div>
            </div>
            <div className="row">
              <div className="col-8 small">% Return</div>
              {0 > data.returnvalue ? (
                <i class="fas fa-arrow-down" />
              ) : (
                <i class="fas fa-arrow-up" />
              )}
              <span className="small">{data.returnvalue}%</span>
            </div>
            <div className="row">
              <div className="col-12">
                <input className="border-0" type="range" min="-100" max="100" />
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default ReturnValue;
