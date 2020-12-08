// core
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// action
import { getServiceData } from "../redux/action/serviceAction";

// components
import BlackCard from "../components/blackcard";
import Card from "../components/card";
import Header from "../components/header";

const Pservice = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.rootService);
  // console.log(store.mainData[1].Object.keys("name"));
  console.log(store);

  useEffect(() => {
    dispatch(getServiceData());
  }, []);

  return (
    <>
      <div className="mt-5">
        <Header title={"PURCHASED SERVICES"} />
      </div>
      <div className="border border-gray p-2 mt-2">
        <Card subData={store.mainData} />
        <BlackCard />
      </div>
    </>
  );
};

export default Pservice;
