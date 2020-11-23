import { getPurchaseData } from "../redux/actions/purchaseAction";
import { useEffect } from "react";
import { useDispatch } from "react-redux";




const PurchasedServices = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        
    })
    dispatch(getPurchaseData)
    
  return (
    <>

                  <div className="container">
                    <div className="row">
                      <div className="col">
                        {/* <EditUserbtn id={data.id} /> */}
                      </div>
                      <div className="col">
                        {/* <DelUserBtn id={data.id} /> */}
                      </div>
                    </div>
                  </div> 
                
    </>
  );
};

export default PurchasedServices;
