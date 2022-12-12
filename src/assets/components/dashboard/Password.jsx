import React, {useRef,useEffect,useState} from 'react'
import Header from '../header/header'
import Sidebar from './Sidebar'
import './Password.css'
import { ContextProvider } from './SideContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';



export default function Password() {
  const form = useRef();
  const [loading,setLoading] = useState({
    isLoading: false
  });
  document.title = "Change Your Password | GenePiki";

  const user_id = localStorage.getItem('auth_user_id');
  const changePass = (e) => {
    e.preventDefault();
    setLoading({ ...loading, isLoading: true });

    const data = {
      current_password : form.current.old_pass.value,
      new_password: form.current.new_pass.value,
      confirm_new_password : form.current.rep_pass.value,
      user_id: user_id
    }
   

    axios.post('/api/changePassword/user',data).then((res)=>{
      setLoading({ ...loading, isLoading: false });

      if(res.data.status == 200){
        swal('Success',res.data.message,'success');

      }else{
        swal('Warning',res.data.message,'warning');
      }
    })
  };
  const navigate = useNavigate();
  const [loggedIn,setLoggedIn] = useState(false);
  useEffect(()=>{
    const logged_in = localStorage.getItem('auth_token');
  if(logged_in){
    setLoggedIn(true)
  }else{
    setLoggedIn(false)
    navigate('/auth');
  }
  },[]);
  return (
    <ContextProvider>
    <div>
         <Header />
         <div className={loading.isLoading ? "auth-body page-loading" : "page-loading-false"}>
        <div className={loading.isLoading ? "auth-body page-loading-content" : "page-loading-content-false"}>

        </div>
    </div>
      <div className="dashboard">
        <Sidebar/>
        <div className="dashboard_body">
        <div className='header_dash'>
        <h2>Change Your Password</h2>
      </div>
          <div className='password_wrapper'>
            <form ref={form} style={{"display":"flex","justifyContent":"center","alignItems":"center","flexDirection":"column"}} onSubmit={changePass}>
              <input type="password" required name="old_pass" placeholder='Enter your old password' />
              <br/>
              <input type="password" required name="new_pass" placeholder='Enter your new password' />
              <br/>
              <input type="password" required name="rep_pass" placeholder='Repeat your new password' />
              <br/>

              <button type="submit" className='form_submit_btn'>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </ContextProvider>
  )
}
