// core
import React from "react";

const BlackCard = () => {
  return (
    <>
      <div className="bg-dark p-5 mt-5">
        <div>
          <span className="text-org">service 1</span>
          <span className="float-right text-org">Kr 25,000-</span>
        </div>
        <div>
          <span className="text-org">service 2</span>
          <span className="float-right text-org">Kr 3,500-</span>
        </div>
        <div>
          <span className="text-org">service 3</span>
          <span className="float-right text-org">Kr 6,000-</span>
        </div>
        <hr />
        <span className="text-org">Total Costing</span>
        <span className="float-right text-org">Kr 34,500-</span>
      </div>
    </>
  );
};

export default BlackCard;
