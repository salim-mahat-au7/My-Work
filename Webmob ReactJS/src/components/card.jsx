// core
import React from "react";


const Card = (props) => {
  console.log(props.subData);

  return (
    <>
      <div className="border border-gray rounded p-3 mt-2">
        <h6 className="mt-2">Main Service 1:</h6>
        <div className="row">
          <div className="col-1">
            <img src="https://picsum.photos/200" alt="" />
          </div>
          <div className="col-11">
            <span>service 1</span>
            <span className="float-right">kr 25,000-</span>
            <p className="muted small">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
      </div>

      <div className="border border-gray rounded p-3 mt-2">
        <h6 className="mt-2">Main Service 2:</h6>
        <div className="row">
          <div className="col-1">
            <img src="https://picsum.photos/300" alt="" />
          </div>
          <div className="col-11">
            <span>service 2</span>
            <span className="float-right">kr 3,500-</span>
            <p className="muted small">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
      </div>

      <div className="border border-gray rounded p-3 mt-2">
        <h6 className="mt-2">Main Service 3:</h6>
        <div className="row">
          <div className="col-1">
            <img src="https://picsum.photos/400" alt="" />
          </div>
          <div className="col-11">
            <span>service 3</span>
            <span className="float-right">kr 6,000-</span>
            <p className="muted small">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
