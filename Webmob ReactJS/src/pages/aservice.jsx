// core
import React from "react";

// components
import Card from "../components/card";
import Header from "../components/header";

const Aservice = () => {
  return (
    <>
      <div className="mt-5">
        <Header title={"ADDITIONAL SERVICES"} />
      </div>

      <div className="border border-gray p-2 mt-2">
        <Card />
      </div>
    </>
  );
};

export default Aservice;
