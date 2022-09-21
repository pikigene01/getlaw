import React, { useState, useEffect,useContext } from "react";
import "./Card.css";
import left_img from "../../imgs/left_nav_bg.png";
import swal from "sweetalert";
import axios from "axios";
import { Link } from "react-router-dom";
import { HomeContext } from "./HomeContext";
import { LocationCity, Map } from "@material-ui/icons";

export default function Featured() {
  const {refresh,setRefresh} = useContext(HomeContext);
  const [skeletonLoader, setSkeletonLoader] = useState(false);
  const [allFeatured, setAllFeatured] = useState([]);
  const [numberReviews, setNumberReviews] = useState([]);
  const [localStorageData,setLocalStorageData] = useState(localStorage.getItem('featured_lawfirms'));
  const [location,setLocation] = useState({
    latitude: '',
    longitude: ''
  })

let i =0;

var x = document.getElementById("location_btn");

const getLocation =()=> {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

const showPosition=(position)=> {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
  setLocation({...location,latitude:position.coords.latitude,longitude:position.coords.longitude})
}

const showError=(error)=> {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

  useEffect(() => {
    const data = {
      role: "1",
      latitude: location.latitude,
      longitude: location.longitude
    };
    if(refresh){
      setLocalStorageData(null);
     }
     else{
       setLocalStorageData(localStorageData);
     
     }
    if(!localStorageData){
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/api/lawfirms/get", data).then((res) => {
        setSkeletonLoader(true);
        setRefresh(false);

        if (res.data.status === 200) {
          setNumberReviews(res.data.number_reviews);
          setAllFeatured(res.data.posts);
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
   setNumberReviews(JSON.parse(localStorage.getItem("numberReviews")));
   setAllFeatured(JSON.parse(localStorage.getItem("featured_lawfirms")));
  }
  }, [refresh,localStorageData,location]);

  useEffect(()=>{
    if(!localStorageData){
      if(skeletonLoader){
        localStorage.setItem("numberReviews",JSON.stringify(numberReviews));
        localStorage.setItem("featured_lawfirms",JSON.stringify(allFeatured));
      }
     
      
    }else{
      localStorage.removeItem("numberReviews");
      localStorage.removeItem("featured_lawfirms");
    }
   
  },[numberReviews,allFeatured,skeletonLoader]);
  var Skeleton_loader = "";

  Skeleton_loader = (

    <div className="lawfirm_flex">
    <div className="lawfirm_card" style={{width: "300px"}}>
      <div className="top">
        <div className="left skeleton">
          <br /> 
        </div>
        <div className="right skeleton">
          <div
            className="skeleton"
            style={{ width: "200px", height: "150px" }}
          ></div>
        </div>
      </div>
      <div className="bot">
        <p className="skeleton"></p>
        <Link to="/">
          <div style={{width: "150px", height: "25px", "borderRadius": "99px","marginTop": "30px"}} className="skeleton"></div>
        </Link>
      </div>
    </div>
    </div>
   
  );
  return (
    <div>
      <div className="featured">
        <div className="featured_head">
          Get In touch with our lawfirms nearest in your area <button id="location_btn" style={{display:'flex',alignItems: 'center',justifyContent: 'center'}} className="btn app-btn" onClick={()=>getLocation()} >Search Lawfirm <Map/> {'latitude' + location.latitude + 'longitude' + location.longitude}</button>
        </div>
      </div>
      <div className="featured_body">
        <div className="left_feature">
          <img src={left_img} style={{ width: "300px" }} alt="img ...." />
        </div>
        <div className="right_feature">
          <div className="card_three">
          {skeletonLoader && (
              <>
            {allFeatured?.map((row) => {
              i++;
              return (
                <div className="lawfirm_flex" key={i}>
                <div className="lawfirm_card">
                  <div className="top grid">
                    <div className="left">
                      $ <br /> {row.price ? row.price : "0.00"}
                    </div>
                    <div className="right">
                      <img
                        src={row.picture}
                        alt={row.description}
                        style={{ width: "100px" }}
                      />
                    </div>
                  </div>
                  <div className="bot">
                    <p>{row.description.substr(0,250)}</p>
                    <Link to={"/lawfirm/" + row.id}>
                      <button className="btn">Schedule Meeting</button>
                    </Link>
                  </div>
                </div>
                </div>
              );
            })}
</>
          )}
{!skeletonLoader && (
              <>
              {[...Array(6)].map(()=>{
                i++;
                return ( 
                  <div key={i}>
                  {Skeleton_loader}
                  </div>
                )
              })}
              
               
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
