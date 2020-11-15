import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from "../components/Main";
import { getStockData } from "../redux/actions/stockAction";

//
const Shares = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.stockRoot);
  console.log(store.stock);

  //
  useEffect(() => {
    dispatch(getStockData());
  }, []);

  return (
    <div>
      <Main msData={store.stock} />
    </div>
  );
};

export default Shares;
