import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { userContact } from "../../redux/actions/userAction";


const ContctUsBtn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  //model
  const [showSignUp, setShowSignUp] = useState(false);
  const handleSignUpShow = () => setShowSignUp(true);
  const handleSignUpClose = () => setShowSignUp(false);

  //form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const signFormSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userContact ({ name, email, message }));
  };
  return (
    <>
      <Link onClick={handleSignUpShow} className="main-btn">
        contact us
      </Link>

      {/* ==============contact-up-model================ */}

      <Modal show={showSignUp} onHide={handleSignUpShow}>
        <Modal.Header>
          <div className="container">
            <div className="row">

              <div className="col-7 mt-2 text-center">
                <Modal.Title className="align-self-center">Contact Us</Modal.Title>
              </div>
              {/* ============================== */}
              <div className="col-1">
                <Modal.Header
                  closeButton
                  onClick={handleSignUpClose}
                ></Modal.Header>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="ModelBody">
          <form onSubmit={signFormSubmitHandler}>
            <div className="model-body-bg">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter fullname"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <input
                  type="message"
                  className="form-control"
                  placeholder="Enter Message"
                  required
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            <div className="container-fluid text-center">
              <div className="row">
                <div className="col align-self-center">
                </div>
                <div className="col">
                  <button type="submit" className="model-main-btn">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

    </>
  );
};

export default ContctUsBtn;
