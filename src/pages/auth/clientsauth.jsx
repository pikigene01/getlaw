import React, { useState,useEffect } from "react";
import Header from "../../assets/components/header/header";
import "./Auth.css";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate,Link } from "react-router-dom";
import { loginapi } from "../../apis/api";

export default function Login() {
  document.title = "Lawyers Login Page | GetLaw";

  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    isLoading: false,
  });
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
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
  const loginSubmit = (e) => {
    e.preventDefault();
    setLoading({ ...loading, isLoading: true });
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(loginapi, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          localStorage.setItem("auth_user_id", res.data.user_id);
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
            <div className="head-title">Log In (Only For Lawyers)</div>
            <form onSubmit={loginSubmit}>
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
                <br />
                <input
                  className="password-input form-input inputs"
                  name="password"
                  onChange={handleInput}
                  value={loginInput.name}
                  type="password"
                  placeholder="please enter your password.."
                />
                <span>{loginInput.error_list.password}</span>
                <button
                  style={{ width: "100%" }}
                  className="app-btn review-sent"
                >
                  Log In
                </button>
                <br />
                <Link to="/forgot_your_password">
                <button
                  style={{ width: "100%" }}
                  className="app-btn review-sent"
                >
                  Forgot Your Password
                </button>
                </Link>
              
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
