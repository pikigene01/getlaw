import React, {useState, useEffect,useRef} from "react";
import Header from "../../assets/components/header/header";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Footer from "../../assets/components/footer/footer";
import support_svg from '../../assets/imgs/support.svg';


export default function Auth() {
  document.title = "Lawfirms Register | GetLaw";

  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const navigate = useNavigate();
  const form = useRef();
  const [loading,setLoading] = useState({
    isLoading: false
  });
 let isCancel = false;
 const [file, setFile] = useState(null);
 const [fileDataURL, setFileDataURL] = useState(null);
  const [registerInput, setRegister] = useState({
     email: '',
     name: '',
     description: '',
     phone: '',
     price: '',
     role: '1',
     confirm_password: '',
     password: '',
     token: '',
     latitude: '',
     longitude: '',
     picture: file,
     error_list: [],
  });

  const [location,setLocation] = useState({
    latitude: '',
    longitude: ''
  })


const getLocation =()=> {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
   console.log("Geolocation is not supported by this browser.");

  }
}

const showPosition=(position)=> {
 
  setLocation({...location,latitude:position.coords.latitude,longitude:position.coords.longitude})
}

const showError=(error)=> {
  switch(error.code) {
    case error.PERMISSION_DENIED:
    console.log("User denied the request for Geolocation.");
    alert('GivLaw need your location to quickly locate you');
      break;
    case error.POSITION_UNAVAILABLE:
    console.log("Location information is unavailable.");
    alert('GivLaw need your location to quickly locate you');

      break;
    case error.TIMEOUT:
    console.log("The request to get user location timed out.");
    alert('GivLaw need your location to quickly locate you');

      break;
    case error.UNKNOWN_ERROR:
    console.log("An unknown error occurred.");
    alert('GivLaw need your location to quickly locate you');

      break;
  }
}
useEffect(()=>{
  getLocation();
},[]);


  const handleInput = (e) => {
    e.persist();
    
    setRegister({...registerInput, [e.target.name]: e.target.value});
    // form_data.append([e.target.name], e.target.value);
    
  }


  const changeHandler = (e) => {
    const files = e.target.files[0];
    // if (!file.type.match(imageMimeType)) {
     
    //   return;
    // }
    setFile(files);
// let imagedata = document.querySelector('input[type="file"]').files[0];

  }
  const [loggedIn,setLoggedIn] = useState(false);
  useEffect(() => {
    const logged_in = localStorage.getItem('auth_token');
    if(logged_in){
      setLoggedIn(true);
      navigate('/');
    }else{
      setLoggedIn(false)
     
    }
    // alert(file?.name)
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
 
  const registerSubmit = (e) => {
    e.preventDefault();
   
    const formData = new FormData();
    formData.append('token', registerInput.token);
    formData.append('email', registerInput.email);
    formData.append('name', registerInput.name);
    formData.append('phone', registerInput.phone);
    formData.append('description', registerInput.description);
    formData.append('price', registerInput.price);
    formData.append('role', registerInput.role);
    formData.append('confirm_password', registerInput.confirm_password);
    formData.append('password', registerInput.password);
    formData.append('latitude', location.latitude);
    formData.append('longitude', location.longitude);
    formData.append('picture_law', file);
    setLoading({...loading, isLoading:true});
    // let settings = { headers: { 'content-type': 'multipart/form-data' } };
    axios.get('/sanctum/csrf-cookie').then(response => {
     
    axios.post('/api/register',formData,{
      headers: {
        'content-type': 'multipart/form-data'
      }}).then(res => {
      if(res.data.status === 200){
     
        localStorage.setItem('auth_token', res.data.token);
        localStorage.setItem('auth_name', res.data.username);
        localStorage.setItem('auth_user_id', res.data.user_id);
         swal("Success", res.data.message,"success");
        navigate('/');
        setLoading({...loading, isLoading:false});
      }else if(res.data.status === 401){
        setLoading({...loading, isLoading:false});
        swal("Warning", res.data.message,"warning");
        setRegister({...registerInput, error_list: res.data.message});

      }else{
        setLoading({...loading, isLoading:false});
        setRegister({...registerInput, error_list: res.data.message});
      }
    });
    
  });
  }
  return (
    <div>
      <Header />
      <div className={loading.isLoading ? "auth-body page-loading" : "page-loading-false"}>
        <div className={loading.isLoading ? "auth-body page-loading-content" : "page-loading-content-false"}>

        </div>
    </div>
      <div className="body-wrapper">
        <div className="left-side">
        <div className="head-title">Become A Member Of Lawyers' Site</div>
          <div className="body-info" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <img draggable={false} src={support_svg} alt="support_getlaw" style={{width:"50%"}} />
           
            <p>Register your lawfirm with just <b>40usd</b> paid once and for all and receive a token....</p>
           <br/>
           <p>Get Offer Token Today <b className="highlighted">getlawtok</b> use the token highlighted</p>
            </div>
        </div>
        <div className="right-side">
        <div className="head-title">Register Your Lawfirm Here</div>
          <div className="body-info">
            <section className="form signup">
        {/* <form onSubmit={registerSubmit} encType="multipart/form-data"> */}
        <form ref={form} onSubmit={registerSubmit}>
          {registerInput.error_list.length > 0 && (
          <div className="error-txt">error occured whilst processing data</div>

          )}
          <div className="name-details">
            <div className="field">
              <label>Enter Lawfirm Name</label>
              <input className="form-input inputs" name="name" onChange={handleInput} value={registerInput.name} type="text" placeholder="Enter lawfirm name"/>
              <span>{registerInput.error_list.name}</span>
            </div>
            <div className="field">
              <label>Enter Lawfirm Fax</label>
              <input className="form-input inputs" name="phone" onChange={handleInput} value={registerInput.phone} type="phone" placeholder="Enter lawfirm phone"/>
              <span>{registerInput.error_list.phone}</span>
            </div>
          </div>
          <div className="field">
              <label>Email Address</label>
              <input className="form-input inputs" name="email" onChange={handleInput} value={registerInput.email} type="text" placeholder="Enter lawfirm email"/>
              <span>{registerInput.error_list.email}</span>
            </div>
            <div className="field">
              <label>Lawfirm Short Description</label>
              <textarea className="form-input inputs" name="description" onChange={handleInput} value={registerInput.description} type="text" placeholder="Enter lawfirm Short Description"/>
              <span>{registerInput.error_list.description}</span>
            </div>

            <div className="field">
              <label>Enter Lawfirm Password (for auth use)</label>
              <input className="form-input inputs" type="password" name="password" onChange={handleInput} value={registerInput.password} placeholder="Enter lawfirm password"/>
              <span>{registerInput.error_list.password}</span>
            </div>
            <div className="field">
              <label>Enter Lawfirm Confirm Password</label>
              <input className="form-input inputs" type="password" name="confirm_password" onChange={handleInput} value={registerInput.confirm_password} placeholder="Repeat lawfirm password"/>
              <span>{registerInput.error_list.confirm_password}</span>
            </div>
            <div className="field">
              <label>Insert Lawfirm Company Logo( Here )</label>
              <input className="form-input inputs" id='image' accept='.png, .jpg, .jpeg' name="file" onChange={changeHandler} type="file"/>
            </div>
            {fileDataURL  ?
            <div className="field">
              <label>Preview Img</label>
              <label htmlFor='image'>
              <img src={fileDataURL} style={{width: "100px",height:"100px"}} alt="img preview" className="preview_img"/>
              </label>
            </div>
            : null }

            <div className="field">
              <label>Enter Lawfirm Price (USD)</label>
              <input className="form-input inputs" name="price" onChange={handleInput} value={registerInput.price} type="number" placeholder="Enter Lawfirm Price"/>
              <span>{registerInput.error_list.price}</span>
              <input className="form-input inputs" name="role" onChange={handleInput} value={registerInput.role} type="hidden" placeholder="Enter Lawfirm Price"/>
            </div>
            <div className="field">
              <label>Before Registering Your Company Enter Your Token</label>
              <input className="form-input inputs" name="token" onChange={handleInput} value={registerInput.token} type="text" placeholder="Enter Lawfirm Token"/>
              <span>{registerInput.error_list.token}</span>
            </div>

            <div className="field">
            <button type="submit" style={{"width": "100%"}} className="app-btn register-sent">
             Register Company
            </button>
            </div>
            
            <div className="field">
              <Link to="/auth">
            <button style={{"width": "100%"}} className="app-btn login-sent">
             Already have a company
            </button>
            </Link>
            </div>
              

        </form>
            </section>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}
