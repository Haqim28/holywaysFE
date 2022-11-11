import "./App.css";
import Navbar from "./components/navbar"; // navbar
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import React from "react";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DetailDonate from "./pages/detaildonate";
import MyRaiseFund from "./pages/myraisefund";
import MakeRaiseFund from "./pages/makeraisefund";

const PrivateRoute = () => {
  const [state] = useContext(UserContext);
  return state.isLogin ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Redirect Auth here ...
  useEffect(() => {
    // Redirect Auth
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false && !isLoading) {
      navigate("/");
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log(response);
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      console.log(payload);
      // Get token from local storage
      payload.token = localStorage.token;
      console.log(payload);
      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      console.log(state);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="">
      <div className="">
        {isLoading ? (
          <></>
        ) : (   
          <>
            <Navbar />
            
           <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/" element={<PrivateRoute />}>
                  <Route path="/myraisefund" element={<MyRaiseFund />} />
                  <Route path="/makeraisefund" element={<MakeRaiseFund />}/>
                  <Route path="/DetailDonate/:id" element={<DetailDonate />} />
                  <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes> 
          </>
        )}
      </div>
    </div>
  );
}
export default App;
