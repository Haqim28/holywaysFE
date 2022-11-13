import Vespa from "./assets/vespa.png";
import Icon from "./assets/holywaysicon.png"
import React, { useState, useContext, useEffect } from "react";
import Raise from "./assets/raise.png"
import "./assets/css/navbar.css";
import AddProduct from "./assets/addpartner.png";
import partner from "./assets/partner.png";
import Register from "./auth/Register";
import keranjang from "./assets/keranjang.png";
import Profil from "./assets/profil.png";
import Profile from "./assets/profile.png";
import Logout from "./assets/logout 1.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate,Link } from "react-router-dom";
import Login from "./assets/Login.png";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { Alert } from "react-bootstrap";
import { useQuery } from "react-query";
import LoginPage from "./auth/Login";


function Navbar() {
  const [state] = useContext(UserContext);
 

  useEffect(() => {
    console.log("this state", state);
  }, [state]);

  return (
    <>
      <div >
        { state.isLogin === true ? (
          <PrivatePage />
        ) : (
          <GuestPage />
          
        )}
      </div>
    </>
  );
}

export default Navbar;

function PrivatePage(props) {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };
  const handleRaise = () => {
    navigate("/myraisefund");
  };
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };


  const id = state.user.id
    //to get image for profile navbar
    const { data: profile ,isLoading} = useQuery("profileCache", async () => {
      const response = await API.get(`/user/${id}`);
      return response.data.data;
    });
  return (
      
    <div className="App Container bg-danger ">
      {/* {isLoading ? 
      <></>  
     : <> */}
      <div className="mr-5 "  >
        <nav className="container navbar navbar-expand-lg bg-danger navbar-light">
          <div className="justify-content-start" onClick={handleHome} style={{ cursor: "pointer" }}>
            <img src={Icon} alt="" />
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse " id="navbarSupportedContent" >
            <ul class="navbar-nav mr-auto "></ul>
            <form class="form-inline my-2 my-lg-0">
              <div className="dropdown ">
                <img src={ Profil} alt=""
                  className="dropdown rounded-circle" width={40} height={40} type="button" id="dropdownMenu2" data-toggle="dropdown"/>
                <ul className="dropdown-menu " aria-labelledby="dropdownMenu2" style={{position:"absolute",left:0,right:20000}}>
                  <li className="dropdown-content  mt-1 " style={{ cursor: "pointer" }}>
                    <div className="bg-white " onClick={handleProfile}>
                      <img src={Profile} className="img fluid mr-3 ml-1" alt="profile"></img>
                      <span className="title-down font-weight-bold">Profile</span>
                    </div>
                  </li>
                  <li className="dropdown-content  mt-1 " style={{ cursor: "pointer" }}>
                    <div className="bg-white " onClick={handleRaise}>
                      <img src={Raise} className="img fluid mr-3 ml-1" alt="profile" ></img>
                      <span className="title-down font-weight-bold">Raise Fund</span>
                    </div>
                  </li>
                  <hr />
                  <li className="dropdown-content  mt-1" style={{ cursor: "pointer" , }}>
                    <div onClick={logout} className="bg-white ">
                      <img
                        src={Logout}
                        className="img fluid mr-3 "
                        alt="profile"
                      ></img>
                      <span className="title-down font-weight-bold">Logout</span>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </nav>
      </div>
       {/* </>}  */}
    </div>  
   
  );
      }

function GuestPage(props) {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className="App Container bg-danger  " >
      <div className="container " id="sticky">
        <nav className="container navbar navbar-expand-lg  navbar-light">
          <div className="justify-content-start " onClick={handleHome} style={{ cursor: "pointer" }}>
            <img src={Icon} alt="HolyWays" />
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto"></ul>
            <form class="form-inline my-2 my-lg-0">
            <Button className="bg-white text-danger font-weight-bold mr-3 "  onClick={() => setShowRegister(true)}>Register</Button>
              <div></div>
              <Button className="bg-white text-danger font-weight-bold  mr-3" onClick={() => setShowLogin(true)}>
                Login
              </Button>
            </form>
          </div>
          {/* <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>
                <img src={Login} alt=""></img>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {message && message}
              <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label></Form.Label>
                  <Form.Control type="email" placeholder="Email" name="email" value={email} onChange={handleChange} autoFocus />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <button className="btn  btn-lg btn-danger w-100 text-white  " variant="primary" size="md" type="submit">
                  Login
                </button>
                <div className=" text-muted text-center mb-3">
                  Don't have an account ?  <span 
                  onClick={handleShow} style={{ cursor: "pointer" }}
                  >Klik Here</span>
                </div>
              </Form>
            </Modal.Body>
          </Modal> */}
        </nav>
      </div>
      <Register show={showRegister} setShow={setShowRegister} setShowLogin={setShowLogin} />
      <LoginPage show={showLogin} setShow={setShowLogin} setShowRegister={setShowRegister} />

    </div>
  );
}

function PartnerPage() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleHome = () => {
    navigate("/income");
  };

  const handleProfile = () => {
    navigate("/profile-partner");
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
   // const [profile, setProfile] = useState(null)
   const id = state.user.id
   //to get image for profile navbar
   const { data: profile } = useQuery("profileCache", async () => {
     const response = await API.get(`/user/${id}`);
     return response.data.data;
   });




  return (
    <div className="App Container bg-warning ">
      <div className="container">
        <nav className="container navbar navbar-expand-lg bg-warning navbar-light">
          <div className="justify-content-start" onClick={handleHome} style={{ cursor: "pointer" }}>
            <a className="navbar-brand waysFoodHeader" alt="">
              WaysFood
            </a>
            <img src={Vespa} alt="delivery" className="ml-2"></img>
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"aria-controls="navbarSupportedContent"aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto"></ul>
            <form class="form-inline my-2 my-lg-0">
              <div className="dropdown">
                <img
                  src={profile?.image === "http://localhost:5000/uploads/" ? partner : profile?.image  }
                  alt=""
                  className="dropdown rounded-circle"
                  width={40}
                  height={40}
                  type="button"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                />

                <ul
                  className="dropdown-menu "
                  style={{ width: "14rem", position: "absolute" }}
                  aria-labelledby="dropdownMenu2"
                >
                  <li
                    className="dropdown-content mr-5 mt-1 "
                    style={{ cursor: "pointer" }}
                  >
                    <div className="bg-white " onClick={handleProfile}>
                      <img
                        src={Profile}
                        className="img fluid mr-3 ml-1"
                        alt="profile"
                      ></img>
                      <span className="title-down">Profile Partner</span>
                    </div>
                  </li>
                  <li
                    className="dropdown-content mr-5 mt-1 "
                    style={{ cursor: "pointer" }}
                  >
                    <div className="bg-white " onClick={handleAddProduct}>
                      <img
                        src={AddProduct}
                        className="img fluid mr-3 ml-1"
                        alt="profile"
                      ></img>
                      <span className="title-down">Add Product</span>
                    </div>
                  </li>
                  <hr />
                  <li
                    className="dropdown-content mr-5 mt-1"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="bg-white " onClick={logout}>
                      <img
                        src={Logout}
                        className="img fluid mr-3 "
                        alt="profile"
                      ></img>
                      <span className="title-down">Logout</span>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </nav>
      </div>
    </div>
  );
}