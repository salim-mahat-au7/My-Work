import React from "react";

import Share from "./Share";
import Company from "./Company";
import BasicInfo from "./BasicInfo";
import MarketValue from "./MarketValue";
import ReturnValue from "./ReturnValue";
import CardButton from "./CardButton";
import DonutChart from "./DonutChart";

const MasterCard = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="mastercard mt-5">
              <div className=" text-left">
                <div className="row pl-3 p-1">
                  <div className="col-xs-1 ml-2">
                    <Share />
                  </div>
                  <div className="col-xs-1 m-1">
                    <Company />
                  </div>
                  <div className="col-xs-2 m-1 p-3 border border-gray">
                    <BasicInfo />
                  </div>
                  <div className="col-xs-2 m-1 p-2 border border-gray">
                    <MarketValue />
                  </div>
                  <div className="col-xs-2 m-1  p-2 border border-gray">
                    <ReturnValue />
                  </div>
                  <div className="col-xs-1">
                    <CardButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col mt-4">
            <span className="small">Portfolio</span>
            <DonutChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterCard;
