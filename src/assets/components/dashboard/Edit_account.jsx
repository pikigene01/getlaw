import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";

import Header from "../header/header";
import Sidebar from "./Sidebar";
import './Edit_account.css'
import axios from "axios";
import { ContextProvider } from './SideContext';
import swal from "sweetalert";


export default function Edit_account() {
  document.title = "Manage / edit account info | GivLaw";

  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [lawyerinfo,setLawyerinfo] = useState([]);
  const [loading,setLoading] = useState({
    isLoading: false
  });
  const [lawyerform,setLawyerForm] = useState({
    name: lawyerinfo.name,
    surname: lawyerinfo.surname,
    phone: lawyerinfo.phone,
    description: lawyerinfo.description,
    location: lawyerinfo.location,
    password: '',
    confirm_password: '',
    picture: file,
    user_id: lawyerinfo.id,
  });
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

  useEffect(()=>{
    const data = {
      user_id: localStorage.getItem('auth_user_id')
    }
    axios.post("/api/lawyers/get/info", data).then((res) => {
      setLoading({ ...loading, isLoading: false });
  
      setLawyerinfo(res.data.posts);
    
    });
  },[]);
  useEffect(()=>{
   
        setLawyerForm({...lawyerform,name:lawyerinfo.name,surname:lawyerinfo.surname,
        phone: lawyerinfo.phone,description:lawyerinfo.description,location:lawyerinfo.location});
        setFileDataURL(lawyerinfo.picture);
  },[lawyerinfo])

  const handleLSubmit = (e) => {
    setLawyerForm({...lawyerform,[e.target.name]:e.target.value});
  }

  const [view,setView]= useState({
    id: 1
  });
  useEffect(() => {
    let isCancel = false;
    let fileReader= false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }
  }, [file]);
  const nextView = (e) => {
    let id= view.id;
    id++;
    if(id >= 6){
      id = 6;
     }
    setView({id:id})
  }
  const prevView = (e) => {
   let id= view.id;
   id--;
   if(id <= 1){
    id = 1;
   }
   setView({id:id})

  }
 

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
     
      return;
    }
    setFile(file);
// let imagedata = document.querySelector('input[type="file"]').files[0];

  }
  const updateAccount = (e) => {
    e.preventDefault();
    setLoading({ ...loading, isLoading: true });

    const data = {
      user_id: localStorage.getItem('auth_user_id'),
      name: lawyerform.name,
      surname: lawyerform.surname,
      phone: lawyerform.phone,
      description: lawyerform.description,
      location: lawyerform.location,
    }

    axios.post("/api/user/update", data).then((res) => {
      setLoading({ ...loading, isLoading: false });

      if(res.data.status == 200){
     swal('Success',res.data.message,'success');
      }else{
     swal('Warning',res.data.message,'warning');

      }
  
  })
  }
  return (
    <ContextProvider>
    <div>
      {" "}
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
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard_body">
        <div className='header_dash'>
        <h2>Account Info</h2>
      </div>
       <div className="account_info">
       <div className="form_wrapper">
        <form onSubmit={updateAccount}>
          {view.id === 1 && (
            <>
          <label>Lawyer Name</label>
          <input type="text" className="input" value={lawyerform.name} onChange={handleLSubmit} placeholder="enter lawyer name" name="name" />
          </>
          )}
          {view.id === 2 && (
            <>
          <label>Lawyer Surname</label>
          <input className="input" type="text" value={lawyerform.surname} onChange={handleLSubmit} placeholder="enter lawyer surname" name="surname" />
          </>
          )}
          {view.id === 3 && (
            <>
          <label>Phone</label>
          <input className="input" type="phone" value={lawyerform.phone} onChange={handleLSubmit} placeholder="enter lawyer phone" name="phone" />
          </>
          )}
          {view.id === 4 && (
            <>
          <label>Description</label>
          <textarea className="input" rows="5" type="text" value={lawyerform.description} onChange={handleLSubmit} placeholder="enter lawyer description" name="description" />
          </>
          )}
          {view.id === 5 && (
            <>
          <label>Location</label>
          <textarea className="input" rows="5" type="text" value={lawyerform.location} onChange={handleLSubmit} placeholder="enter lawyer location" name="location" />
          </>
          )}
         
          {view.id === 6 && (
            <>
        
              <label>Lawyer Profile Picture</label>
              <input className="form-input inputs" id='image' accept='.png, .jpg, .jpeg' name="file" value={lawyerform.picture} onChange={changeHandler} type="file"/>
           
            {fileDataURL  ?
           
              <label htmlFor='image'>
              <img src={fileDataURL} style={{width: "100px",height:"100px"}} alt="img preview" className="preview_img"/>
              </label>
           
            : null }
          <button type="Submit" className="save_lawyer_btn">Update</button>
          </>
          )}
          <div className="next_view">
          <span className="prev_btn" onClick={prevView}>Prev</span>
          <span className="next_btn" onClick={nextView}>Next</span>
          </div>
        </form>
      </div>
       </div>
        </div>
      </div>
    </div>
    </ContextProvider>
  );
}
