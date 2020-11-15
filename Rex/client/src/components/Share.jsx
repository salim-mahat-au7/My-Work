import React from "react";

const Share = (props) => {
  console.log(props);
  return (
    <>
      {props.ssData.map((data) => (
        <>
          <div className="border border-gray p-1 m-1">
            <div className="row">
              <div className="col-2 align-self-center">
                <i className="fa fa-bars" />
              </div>
              <div className="col">
                <div className="row">
                  <div className="col-3">
                    <span className="sharetype">ITOT</span>
                    <br />
                    <span className="price">${data.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default Share;
