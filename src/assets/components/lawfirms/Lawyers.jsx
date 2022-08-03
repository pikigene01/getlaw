import React,{useState,useEffect,useContext} from 'react'
import './Card.css'
import axios from 'axios';
import {Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';



import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { HomeContext } from './HomeContext';


export default function Lawyers() {
  const {refresh,setRefresh} = useContext(HomeContext);

    const [skeletonLoader, setSkeletonLoader] = useState(false);
    const [allLawyers, setAllLawyers] = useState([]);
  const [localStorageData,setLocalStorageData] = useState(localStorage.getItem('all_lawyers'));

  let i = 0;
    useEffect(() => {
      const data = {
        role: "2",
      };
      if(refresh){
        setLocalStorageData(null);
       }
       else{
         setLocalStorageData(localStorageData);
       
       }
      if(!localStorageData){
        axios.get("/sanctum/csrf-cookie").then((response) => {
          axios.post("/api/lawyers/get/gene", data).then((res) => {
            setSkeletonLoader(true);
            setRefresh(false);

            if (res.data.status === 200) {
              setAllLawyers(res.data.posts);
            } else if (res.data.status === 401) {
              setSkeletonLoader(true);
              swal("Warning", res.data.message, "warning");
            } else {
              setSkeletonLoader(true);
              swal(
                "Warning",
                "Something Went Wrong Check Your Internet Access Please",
                "warning"
              );
            }
          });
        });
      }else{
  setSkeletonLoader(true);
  setAllLawyers(JSON.parse(localStorage.getItem('all_lawyers')))
      }
    
    }, [refresh,localStorageData]);
    useEffect(()=>{
     if(!localStorageData){
      localStorage.setItem('all_lawyers', JSON.stringify(allLawyers));
     }
    },[allLawyers])

    var Skeleton_loader = "";

    Skeleton_loader = (
  
        <article className='lawyer' >
              
        <div className='lawyer_avatar_skeleton skeleton'>
           
            </div>
            <div className='lawyer_body'>
        <h5 className='skeleton'  style={{height:"20px","margin": "10px"}}></h5>
        <small className='lawyer_description skeleton' style={{height:"20px"}}>
           
        </small>
       <Link to='/'><button className='view_info_btn skeleton'  style={{width:"50%"}}></button></Link>
       </div>
    </article>
     
    );
  

  return (
    <div>
    <div className='lawyers'>
     <div className='lawyers_head'>
    Our Best Lawyers Available
     </div>
     <div className='lawyers_body centered'>
     {skeletonLoader && (
              <>
        {allLawyers.map((row)=>{
          i++;
            return (
             
                <article key={i} className='lawyer' >
              
            <div className='lawyer_avatar'>
                <img src={row.picture} alt="lawyer_card" />
                </div>
                <div className='lawyer_body'>
            <h5>{row.name}</h5>
            <small className='lawyer_description'>
                {row.description.substr(0,250)}
            </small>
           <Link to={"/lawfirm/"+row.name.toLowerCase()+"/"+row.belongs}><button className='view_info_btn'>Be first to get an instant meeting</button></Link>
           </div>
        </article>
      
        )})}
      </>
     )}
     {!skeletonLoader && (
        <>
        {Skeleton_loader}
        {Skeleton_loader}
        {Skeleton_loader}
        {Skeleton_loader}
        </>
     )}

     </div>
     </div>
   
     </div>

 
  )
}
