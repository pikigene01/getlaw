import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import Sidebar from "./Sidebar";
import './Add_lawyer.css'
import { useState } from "react";
import swal from 'sweetalert'
import axios from 'axios'
import { ContextProvider } from './SideContext';


export default function Add_lawyer() {
  document.title = "Manage Lawyers | GenePiki";

  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [lawyers,setLawyers] = useState([]);
  const [skeletonLoader, setSkeletonLoader] = useState(false);
  const [update,setUpdate] = useState(true);
  const [loading,setLoading] = useState({
    isLoading: false
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
  const [lawyerform,setLawyerForm] = useState({
    name: '',
    email: '',
    surname: '',
    phone: '',
    price: 'null',
    description: '',
    location: '',
    password: '',
    role: '2',
    belongs: localStorage.getItem('auth_user_id'),
    token: 'getlawtok',
    picture: file
  });
 

  const handleLSubmit = (e) => {
    setLawyerForm({...lawyerform,[e.target.name]:e.target.value});
  };

  useEffect(()=>{
    const data = {
      user_id: localStorage.getItem('auth_user_id')
    }
    axios.post("/api/lawyers/get/gene/dash", data).then((res) => {
      setSkeletonLoader(true);

      setLawyers(res.data.posts);
     
    });
   
  },[update]);

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
    if(id >= 9){
      id = 9;
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

  const deleteUser = (user_id) => {
    setLoading({ ...loading, isLoading: true });

   const data = {
    user_id: user_id,
    belongs: localStorage.getItem('auth_user_id'),
    isAuthenticated: true
   }

    axios.post("/api/user/delete", data).then((res) => {
      setLoading({ ...loading, isLoading: false });
      setUpdate(!update);
      if(res.data.status == 200){
     swal('Success',res.data.message,'success');
      }else{
     swal('Warning',res.data.message,'warning');

      }
  
  })
    // confirm('Are you sure you want to delete this specified user..')
  }
 

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
     
      return;
    }
    setFile(file);
// let imagedata = document.querySelector('input[type="file"]').files[0];

  }

  const AddNewLawyer = (e) => {
    e.preventDefault();
   
    const formData = new FormData();
    formData.append('token', lawyerform.token);
    formData.append('email', lawyerform.email);
    formData.append('name', lawyerform.name.replace(/\s/g, ""));
    formData.append('surname', lawyerform.surname);
    formData.append('belongs', lawyerform.belongs);
    formData.append('phone', lawyerform.phone);
    formData.append('description', lawyerform.description);
    formData.append('location', lawyerform.location);
    formData.append('price', lawyerform.price);
    formData.append('role', lawyerform.role);
    formData.append('confirm_password', lawyerform.confirm_password);
    formData.append('password', lawyerform.password);
    formData.append('picture_law', file);
    setLoading({...loading, isLoading:true});
    let settings = { headers: { 'content-type': 'multipart/form-data' } };
    axios.get('/sanctum/csrf-cookie').then(response => {
     
    axios.post('/api/register',formData,settings).then(res => {
      setUpdate(!update);
      if(res.data.status === 200){
     
         swal("Success", res.data.message,"success");
      
        setLoading({...loading, isLoading:false});
      }else if(res.data.status === 401){
        setLoading({...loading, isLoading:false});
        swal("Warning", res.data.message,"warning");

      }else{
        setLoading({...loading, isLoading:false});
        setLawyerForm({...lawyerform, error_list: res.data.message});
      }
    });
    
  });
  }
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
        <h2>Add Lawyer</h2>
      </div>
      <div className="grid_dash">
      <div className="form_wrapper">
        <form onSubmit={AddNewLawyer}>
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
          <label>Email</label>
          <input className="input" type="email" value={lawyerform.email} onChange={handleLSubmit} placeholder="enter lawyer email" name="email" />
          </>
          )}
          {view.id === 5 && (
            <>
          <label>Description</label>
          <textarea className="input" rows="5" type="text" value={lawyerform.description} onChange={handleLSubmit} placeholder="enter lawyer description" name="description" />
          </>
          )}
          {view.id === 6 && (
            <>
          <label>Location</label>
          <textarea className="input" rows="5" type="text" value={lawyerform.location} onChange={handleLSubmit} placeholder="enter lawyer location" name="location" />
          </>
          )}
          {view.id === 7 && (
            <>
          <label>Password : He/she can change using the specified credentials</label>
          <input className="input" type="password" placeholder="enter lawyer password" onChange={handleLSubmit} value={lawyerform.password} name="password" />
          </>
          )}
          {view.id === 8 && (
            <>
          <label>Confirm Password</label>
          <input className="input" type="password" placeholder="enter lawyer password" onChange={handleLSubmit} value={lawyerform.confirm_password} name="confirm_password" />
        
          </>
          )}
          {view.id === 9 && (
            <>
        
              <label>Lawyer Profile Picture</label>
              <input className="form-input inputs" id='image' accept='.png, .jpg, .jpeg' name="file" value={lawyerform.picture} onChange={changeHandler} type="file"/>
           
            {fileDataURL  ?
           
              <label htmlFor='image'>
              <img src={fileDataURL} style={{width: "100px",height:"100px"}} alt="img preview" className="preview_img"/>
              </label>
           
            : null }
          <button type="Submit" className="save_lawyer_btn">Save</button>
          </>
          )}
          <div className="next_view">
          <span className="prev_btn" onClick={prevView}>Prev</span>
          <span className="next_btn" onClick={nextView}>Next</span>
          </div>
        </form>
      </div>
      <div className="lawyers_available_dash">
       Manage Lawyers
        <div className="grid_for_law">
        {skeletonLoader ? (
                    <>
        {lawyers.map((data)=>{
          return (
        <div className="lawyer_dash_card">
          <img src={data.picture} alt={data.description} style={{width:"30px",height: "30px"}} />
          <h3>{data.name}</h3>
          <button onClick={()=>deleteUser(data.id)}>Delete</button>
        </div>
        );
        })}
        </>
        ):(
          <>
          {[...Array(5)].map(()=>{
            return (
          <div className="lawyer_dash_card skeleton">
        </div>
            );
        })}
        </>
        )}
        </div>
      </div>
      </div>
        </div>
      </div>
    </div>
    </ContextProvider>
  );
}
