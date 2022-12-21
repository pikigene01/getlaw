import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/auth";
import Meet from "./pages/meetings/meet";
import Lawfirm from "./pages/lawfirms/lawfirm";
import Login from "./pages/auth/clientsauth";
import Clientsbookings from "./pages/subsciptions/clientsbookings";
import Lawyerssub from "./pages/subsciptions/lawyerssub";
import Dashboard from "./assets/components/dashboard/Dashboard";
import About from "./assets/components/about/about";
import axios from "axios";
import Contact from "./assets/components/contact/contact";
import Support from "./assets/components/support/support";
import Pricing from "./assets/components/pricing/Pricing";
import Blog from "./assets/components/blog/blog";
import Notes from "./assets/components/dashboard/Notes";
import Password from "./assets/components/dashboard/Password";
import Add_lawyer from "./assets/components/dashboard/Add_lawyer";
import Money from "./assets/components/dashboard/Money";
import Support_dev from "./assets/components/dashboard/Support_dev";
import Report_bug from "./assets/components/dashboard/Report_bug";
import Notification_dash from "./assets/components/dashboard/Nofication";
import Blog_dash from "./assets/components/dashboard/Blog";
import Lawfirm_info from "./assets/components/dashboard/Edit_account";
import Welcome_Meet from "./pages/meetings/Welcome_Meet";
import Notfound from "./assets/components/notfound/notfound";
import WholeApp from "./assets/components/home/WholeApp";
import BlogApp from "./assets/components/blog/BlogApp";
import Add_files from "./assets/components/dashboard/Add_files";
import ForgotPass from "./pages/auth/forgotpassword";
import Policy from "./assets/components/policy/Policy";
import { apihost } from "./apis/api";


axios.defaults.baseURL = apihost;
// axios.defaults.headers.post["content-type"] = "application/json";
// // axios.defaults.headers.post["content-type"] = "multipart/form-data: boundary=add-random-characters";
// axios.defaults.headers.post["Accept"] = "application/json";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WholeApp />} />
        <Route exact path="/meetings/:id" element={<Meet />} />
        <Route exact path="/meetings" element={<Welcome_Meet />} />
        <Route exact path="/lawfirm/:id" element={<Lawfirm />} />
        <Route exact path="/lawfirm/:name/:id" element={<Lawfirm />} />
        <Route exact path="/subcription/:id" element={<Lawyerssub />} />
        {/* <Route exact path="/lawfirm/auth" element={<Auth />} /> */}
        <Route exact path="/about" element={<About />} />
        <Route exact path="/privacy/policy" element={<Policy />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/support" element={<Support/>} />
        <Route exact path="/pricing" element={<Pricing/>} />
        <Route exact path="/blog" element={<BlogApp/>} />
        <Route exact path="/blog/:id" element={<BlogApp/>} />
        
        {/* <Route exact path="/auth" element={<Login />} /> */}
        <Route path="/lawfirm/auth" element=
          { <Auth/>} />
       
        <Route path="/auth" element=
          { <Login/>}/>
        <Route path="/forgot_your_password" element=
          { <ForgotPass/>}/>
          <Route exact path="/dashboard" element=
        {<Dashboard />}/>
        <Route exact path="/dashboard/password" element={<Password />} />
        <Route exact path="/dashboard/notification" element={<Notification_dash />} />
        <Route exact path="/dashboard/notes" element={<Notes/>} />
        <Route exact path="/dashboard/lawfirm_info" element={<Lawfirm_info />} />
        <Route exact path="/dashboard/add_lawyer" element={<Add_lawyer />} />
        <Route exact path="/dashboard/money" element={<Money />} />
        <Route exact path="/dashboard/developers_support" element={<Support_dev />} />
        <Route exact path="/dashboard/report_bug" element={<Report_bug />} />
        <Route exact path="/dashboard/add/blog" element={<Blog_dash />} />
        <Route exact path="/dashboard/add/document" element={<Add_files />} />

       
        <Route exact path="/bookings/:id" element={<Clientsbookings />} />
        <Route exact path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;

