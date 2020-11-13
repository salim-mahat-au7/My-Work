import React from "react";

const BasicInfo = () => {
  return (
    <div>
      <div className="row">
        <div className="col-8 small">
          <i className="fa fa-box" />
          Quantity
        </div>
        <div className="col-2 small">150</div>
      </div>

      <div className="row">
        <div className="col-8 small">
          <i className="fas fa-at" />
          Avg-Cost
        </div>
        <div className="col-1 small">$44.9</div>
      </div>
      <div className="row">
        <div className="col-8 small">
          <i className="fas fa-money-check-alt" />
          Invested Amt
        </div>
        <div className="col-1 small">$6736.93</div>
      </div>
    </div>
  );
};

export default BasicInfo;
