import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import LoginPage from '../assets/Login.png';
import { Alert } from "react-bootstrap";
import { useMutation } from 'react-query';   
import { API } from '../../config/api';
import {UserContext} from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

function Login({ show, setShow, setShowRegister }) {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);


  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const data = await API.post("/login", form);

      const alert = <Alert variant="success">Login berhasil!</Alert>;

      setMessage(alert);
      console.log("ini data", data);

      let payload = data.data.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
      

      setTimeout(navigate("/"), 1000);

      

      console.log("isi payload", payload);
      console.log("ini data login", data);
    } catch (e) {
      console.log(e);
      const alert = <Alert variant="danger">Email / password salah!</Alert>;

      setMessage(alert);
    }
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleHome = () => {
    navigate("/");
  };
  return (
    <>
     <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
              <Modal.Title>
                <img src={LoginPage} alt=""></img>
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
                <div className=" text-muted text-center mb-3 mt-3">
                  Don't have an account ?  <span 
                  onClick={() => {
                    setShow(false)
                    setShowRegister(true)
                  }} style={{ cursor: "pointer" }}
                  >Klik Here</span>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
    
    </>
  );
}
export default Login;