import React,{useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import Header from '../header/header'
import './Blog.css'
import { Delete, DeleteForever, Edit } from '@material-ui/icons';
import { ContextProvider } from './SideContext';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



export default function Blog_dash() {
  document.title = "Add / Edit Your Blog Post Here | GenePiki";

  const navigate = useNavigate();
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [file, setFile] = useState(null);
  const [blogs,setBlogs] = useState([]);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [blogform,setBlogForm] = useState({
    title: '',
    category: '',
    description: '',
    picture: file
  });
  const [loading, setLoading] = useState({
    isLoading: false,
  });
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

  const handleLSubmit = (e) => {
    setBlogForm({...blogform,[e.target.name]:e.target.value});
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
  const blog_get = () =>{
    const data = {
      user_id: localStorage.getItem('auth_user_id')
    }
    axios.post("api/blog/get", data).then((res) => {
    setBlogs(res.data.blogs);
    });
  }
    useEffect(()=>{
      blog_get();
     
    },[])

  const nextView = (e) => {
    let id= view.id;
    id++;
    if(id >= 4){
      id = 4;
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

  };
  const deletePost = (post_id) => {
    const data = {
      isAuthenticated: loggedIn,
      post_id: post_id
    }
    setLoading({...loading, isLoading:true});

    axios.post("api/blog/delete", data).then((res) => {
      setLoading({...loading, isLoading:false});

      if(res.data.status == 200){
    swal('Success',res.data.message,'success');
    blog_get();
   
      }else{
    swal('Warning',res.data.message,'warning');

      }
    });
  }

  const add_blog = (e) => {
    e.preventDefault();
    setLoading({...loading, isLoading:true});

    const data = {
      category: blogform.category,
      description: blogform.description,
      title: blogform.title,
      image: '',
      user_id: localStorage.getItem('auth_user_id')
    }
    const formData = new FormData();
    formData.append('category', blogform.category);
    formData.append('description', blogform.description );
    formData.append('title', blogform.title);
    formData.append('image', file);
    formData.append('user_id', localStorage.getItem('auth_user_id'));
    let settings = { headers: { 'content-type': 'multipart/form-data' } };

    axios.post("api/blog/add", formData,settings).then((res) => {
      setLoading({...loading, isLoading:false});

      if(res.data.status == 200){
    swal('Success',res.data.message,'success');
    setView({...view,id:'1'});
      }else{
    swal('Warning',res.data.message,'warning');

      }
    });
  }
  
  return (
    <ContextProvider>
    <div>
        <Header/>
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
            <Sidebar/>
            <div className='dashboard_body'>
            <div className='header_dash'>
        <h2>Add / Edit Blog</h2>
      </div>
      <div className='blog_wrapper_dash'>
            <div className="form_wrapper">
              <form onSubmit={add_blog}>
                {view.id === 1 && (
                  <>
                <label>Title</label>
                <input type="text" className="input" value={blogform.title} onChange={handleLSubmit} placeholder="enter blog title" name="title" />
                </>
                )}
                {view.id === 2 && (
                  <>
                <label>Category</label>
                <select className="input" type="text" value={blogform.category} onChange={handleLSubmit} name="category">
                  <option value="crime">Crime</option>
                  <option value="news">News</option>
                  <option value="advertisement">Advertisement</option>
                  <option value="fraud">Fraud</option>
                  </select>
                </>
                )}
                
                {view.id === 3 && (
                  <>
                <label>Description</label>
                <textarea className="input" rows="5" type="text" value={blogform.description} onChange={handleLSubmit} placeholder="type blog description" name="description" />
                </>
                )}
                
              
                {view.id === 4 && (
                  <>
              
                    <label>Blog Image</label>
                    <input className="form-input inputs" id='image' accept='.png, .jpg, .jpeg' name="file" value={blogform.picture} onChange={changeHandler} type="file"/>
                
                  {fileDataURL  ?
                
                    <label htmlFor='image'>
                    <img src={fileDataURL} style={{width: "100px",height:"100px"}} alt="img preview" className="preview_img"/>
                    </label>
                
                  : null }
                <button type="Submit" className="save_lawyer_btn">Add Blog</button>
                </>
                )}
                <div className="next_view">
                <span className="prev_btn" onClick={prevView}>Prev</span>
                <span className="next_btn" onClick={nextView}>Next</span>
                </div>
              </form>
            </div>
      <div className='blob_posts_all'>
        <table className='blog_table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>CATEGORY</th>
              <th>DESCRIPTION</th>
              <th>PICTURE</th>
              <th>EDIT</th>
              <th>DELETE</th>
              </tr>
          </thead>
          <tbody>
            <>
            {blogs.length > 0 ? (
              <>
            {blogs.map((data)=>{
              return (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.title}</td>
              <td>{data.category}</td>
              <td>{data.description}</td>
              <td><img src={data.image} alt={data.description} style={{width:"40px",height:"40px"}} /></td>
              <td><Edit className='icon'/></td>
              <td onClick={()=> deletePost(data.id)}><DeleteForever className="icon"/></td>
            </tr>
              )
               })}</>

  ): (
<tr>
              <td>empty</td>
              <td>empty Title</td>
              <td>empty blog post found</td>
              <td>empty</td>
              <td>image</td>
              <td><Edit className='icon'/></td>
              <td><DeleteForever className="icon"/></td>
            </tr>
  )}
  </>
          </tbody>
        </table>
      </div>
      </div>
            </div>
        </div>

    </div>
    </ContextProvider>
  )
}
