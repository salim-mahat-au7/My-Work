import React from "react";

const ReturnValue = () => {
  return (
    <div>
      <div className="row">
        <div className="col-8 small">Unrealized P&L</div>
        <div className="col-2 pr-5 small">$2805.58</div>
      </div>
      <div className="row">
        <div className="col-9 small">% Return</div>
        {0 > -1 ? (
          <i class="fas fa-arrow-down" />
        ) : (
          <i class="fas fa-arrow-up" />
        )}
        <span className="small">10%</span>
      </div>
      <div className="row">
        <div className="col-12">
          <input className="border-0" type="range" min="-100" max="100" />
        </div>
      </div>
    </div>
  );
};

export default ReturnValue;
