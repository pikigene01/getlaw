import React, { useState,useEffect } from "react";
import Header from "../../assets/components/header/header";
import "./Auth.css";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function ForgotPass() {
  document.title = "Lawyers Login Page | GetLaw";

  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    isLoading: false,
  });
  const [loginInput, setLogin] = useState({
    email: "",
    error_list: [],
  });
  const [loggedIn,setLoggedIn] = useState(false);
 
    useEffect(()=>{
      const logged_in = localStorage.getItem('auth_token');
    if(logged_in){
      setLoggedIn(true);
      navigate('/');
    }else{
      setLoggedIn(false)
     
    }
    },[])

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };
  const forgotpassSubmit = (e) => {
    e.preventDefault();
    setLoading({ ...loading, isLoading: true });
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/api/forgot-password", data).then((res) => {
        if (res.data.status === 200) {
          
          swal("Success", res.data.message ?? "error", "success");
          navigate("/dashboard");
        } else if (res.data.status === 401) {
          setLoading({ ...loading, isLoading: false });
          swal("Warning", res.data.message, "warning");
        } else {
          swal("Warning", "Error with the connection..", "warning");
          setLogin({ ...loginInput, error_list: res.validation_errors });
        }
      });
    });
  };

  return (
    <>
      <div>
        <Header />
        <div
          className={
            loading.isLoading ? "auth-body page-loading" : "page-loading-false"
          }
        >
          <div
            className={
              loading.isLoading
                ? "auth-body page-loading-content"
                : "page-loading-content-false"
            }
          ></div>
        </div>

        <div className="auth-wrapper centered-login">
          <div
            className={loading.isLoading ? "auth-body loading" : "auth-body"}
          >
            <div className="head-title">Forgot your password</div>
            <form onSubmit={forgotpassSubmit}>
              <div className="login-container">
                <input
                  className="name-input form-input inputs"
                  name="email"
                  onChange={handleInput}
                  value={loginInput.email}
                  type="email"
                  placeholder="please enter your email.."
                />
                <span>{loginInput.error_list.email}</span>
                
                <button
                  style={{ width: "100%" }}
                  className="app-btn review-sent"
                >
                 sent reset link
                </button>
            
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
