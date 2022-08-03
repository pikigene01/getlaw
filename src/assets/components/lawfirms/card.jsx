import React, { useState, useEffect,useContext } from "react";
import Logo from "../../imgs/logo.jfif";
import img1 from "../../imgs/4.jpg";
import img2 from "../../imgs/5.jpg";
import img3 from "../../imgs/6.jpg";
import { AiOutlineStar } from "react-icons/ai";
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { HomeContext } from "./HomeContext";
import "./Card.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Card() {
  const {refresh,setRefresh} = useContext(HomeContext);

  const [loading, setLoading] = useState({
    isLoading: false,
  });
  const [numberReviews, setNumberReviews] = useState([]);
  const [percReviews, setPercReviews] = useState([]);
  const [skeletonLoader, setSkeletonLoader] = useState(false);
  let number_reviews = "";
 let key = 0;
  const [localStorageData,setLocalStorageData] = useState(localStorage.getItem('posts'));
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
 
  `;

  const [allLawfirms, setallLawfirms] = useState([]);
  let i = -1,
    fiveStar = "",
    fourStar = "",
    threeStar = "",
    twoStar = "",
    oneStar = "";
let loaderkey = 1;
  useEffect(() => {
     const data = {
      role: "1",
    };
    if(refresh){
     setLocalStorageData(null);
    }
    else{
      setLocalStorageData(localStorageData);
    
    }
    if(!localStorageData){
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios.post("/api/lawfirms/get", data).then((res) => {
         setSkeletonLoader(true)
         setRefresh(false);
          if (res.data.status === 200) {
         
            setNumberReviews(res.data.number_reviews);
            setPercReviews(res.data.reviews);
            
            setallLawfirms(res.data.posts);

          } else if (res.data.status === 401) {
           setSkeletonLoader(true)
            swal("Warning", res.data.message, "warning");
          } else {
           setSkeletonLoader(true)
            swal(
              "Warning",
              "Something Went Wrong Check Your Internet Access Please",
              "warning"
            );
          }
        });
      });
    }else{
      setSkeletonLoader(true)
      // console.log(JSON.parse(localStorage.getItem('number_reviews')))
      setNumberReviews(JSON.parse(localStorage.getItem('number_reviews')));
      setPercReviews(JSON.parse(localStorage.getItem('reviews')));
      setallLawfirms(JSON.parse(localStorage.getItem('posts')));
    }
  }, [refresh,localStorageData]);
  useEffect(()=>{
    if(!localStorageData){
      localStorage.setItem("reviews",JSON.stringify(percReviews));
      localStorage.setItem("number_reviews",JSON.stringify(numberReviews));
      localStorage.setItem("posts",JSON.stringify(allLawfirms));
    }
   
  },[percReviews,numberReviews,allLawfirms]);
  var Skeleton_loader = "";

  Skeleton_loader = (
    <SwiperSlide>
      <Link to="/">
        <div className="card">
        <div className="card_img_wrapper skeleton" style={{width: '100%',height: '300px'}}>
         
        </div>

        <div className="cardInfo">
          <div className="twogrid">
            <div>
              <p className="card-title skeleton" style={{ width: "100%",height: '15px'  }}></p>
              <b className="card-law skeleton" style={{ width: "100%",height: '15px'  }}></b>
              <div className="card-price skeleton" style={{ width: "40%",height: '15px' }}></div>
              <hr />
            </div>
            <div className="ratings">
              <div className="fiveratings rating">
                <div className="perc skeleton" style={{ width: "100%" }}>
                 
                </div>
              </div>
              <div className="fourratings rating">
                <div className="perc skeleton" style={{ width: "100%" }}>
                  
                </div>
              </div>
              <div className="threeratings rating">
                <div className="perc skeleton" style={{ width: "100%" }}>
                 
                </div>
              </div>
              <div className="tworatings rating">
                <div className="perc skeleton" style={{ width: "100%" }}>
                 
                </div>
              </div>
              <div className="oneratings rating">
                <div className="perc skeleton" style={{ width: "100%" }}>
                 
                </div>
              </div>

              <h4 className="reviews skeleton" style={{ width: "40%",height: '15px'  }}></h4>
            </div>
          </div>
        </div>
        </div>
      </Link>
    </SwiperSlide>
  );
  return (
    <>
      {" "}
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
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={5}
        slidesPerView={3}
        navigation
        pagination={{ clickable: false }}
      >
        <div className="centered">
          <div className="company_profiles">
            {/* {allLawfirms.map(({id,name,price,lawyers,reviews,picture})=>{ */}

            {skeletonLoader && (
              <>
                {allLawfirms.map((data) => {
                  i++;
                  key++;
                  number_reviews = numberReviews[0][i][0].count;
                 
                  fiveStar = Math.floor(
                    (percReviews[0][i][0].five_stars / number_reviews) * 100
                  );
                  fourStar = Math.floor(
                    (percReviews[0][i][0].four_stars / number_reviews) * 100
                  );
                  threeStar = Math.floor(
                    (percReviews[0][i][0].three_stars / number_reviews) * 100
                  );
                  twoStar = Math.floor(
                    (percReviews[0][i][0].two_stars / number_reviews) * 100
                  );
                  oneStar = Math.floor(
                    (percReviews[0][i][0].one_stars / number_reviews) * 100
                  );

                  return (
                    <div key={data?.id}>
                      <SwiperSlide>
                        <Link to={"/lawfirm/" + data.id}>
                          <div className="card">
                            <div className="card_img_wrapper">
                              <img
                                src={data.picture ? data.picture : ""}
                                className=""
                                alt="lawfirm-logo"
                                width="100%"
                                height="300px"
                              />
                            </div>

                            <div className="cardInfo">
                              <div className="twogrid">
                                <div>
                                  <p className="card-title">
                                    {data.name ? data.name : "no title"}
                                  </p>
                                  <b className="card-law">
                                     lawyers available (<b>{numberReviews[0][i][0].lawyers_count}</b>)
                                  </b>
                                  <div className="card-price">
                                    ${" "}
                                    {data.price
                                      ? data.price
                                      : "No price at the moment."}
                                  </div>
                                  <hr />
                                </div>
                                <div className="ratings">
                                  <div className="fiveratings rating">
                                    <div
                                      className="perc"
                                      style={{
                                        width: fiveStar + "%" || 0 + "%",
                                      }}
                                    >
                                      <p>5</p>
                                    </div>
                                  </div>
                                  <div className="fourratings rating">
                                    <div
                                      className="perc"
                                      style={{
                                        width: fourStar + "%" || 0 + "%",
                                      }}
                                    >
                                      <p>4</p>
                                    </div>
                                  </div>
                                  <div className="threeratings rating">
                                    <div
                                      className="perc"
                                      style={{
                                        width: threeStar + "%" || 0 + "%",
                                      }}
                                    >
                                      <p>3</p>
                                    </div>
                                  </div>
                                  <div className="tworatings rating">
                                    <div
                                      className="perc"
                                      style={{
                                        width: twoStar + "%" || 0 + "%",
                                      }}
                                    >
                                      <p>2</p>
                                    </div>
                                  </div>
                                  <div className="oneratings rating">
                                    <div
                                      className="perc"
                                      style={{
                                        width: oneStar + "%" || 0 + "%",
                                      }}
                                    >
                                      <p>1</p>
                                    </div>
                                  </div>

                                  {/* <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />  */}
                                  <h4 className="reviews">
                                    {" "}
                                    {number_reviews} reviews
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    </div>
                  );
                })}
              </>
            )}

            {!skeletonLoader && (
              <>
              {[...Array(4)].map(()=>{
              loaderkey++;
                return (
                  <div key={key}>
                  {Skeleton_loader}
                 
                </div>
                )
              })}
              </>
            
            )}
          </div>
        </div>
      </Swiper>
    </>
  );
}
