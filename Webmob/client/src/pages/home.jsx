import React from "react";
import { useSelector } from "react-redux";
// import PurchasedServices from "./"
const Home = () => {
  //
  const store = useSelector((store) => store.purchaseRoot);

  return (
    <>
      <div className="container">
        <h3 className="text-left mt-4">Purchased_Services</h3>
        <div className="float-right">
        </div>
        {/* <PurchasedServices purchaseData={store.purchaseData} /> */}
      </div>
    </>
  );
};

export default Home;
