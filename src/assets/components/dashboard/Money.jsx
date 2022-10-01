import React,{useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";

import Header from '../header/header'
import Sidebar from './Sidebar'
import './Money.css'
import { Timeline } from '@material-ui/icons'
import { ContextProvider } from './SideContext';
import axios from 'axios';
import swal from "sweetalert";


export default function Money() {
  document.title = "Get To know Money transferes into your account | GivLaw";

  const navigate = useNavigate();
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
  const [data,setData] = useState([]);
  const [rate,setRate] = useState({
    rate: '',
    currency: 'rtgs',
    user_token: localStorage.getItem('auth_token')
  })
  const rateHandler = (e) => {
    setRate({...rate,[e.target.name]:e.target.value});
    const data = {
      [e.target.name]:e.target.value,
    }
    axios.post('/api/money/rate/get',data).then((res)=>{
      setLoading({ ...loading, isLoading: false });

      if(res.data.status == 200){
        setData(res.data.rates);

      }else{
        swal('Warning',res.data.message,'warning');
      }
    })
  }
  useEffect(()=>{
    data.map(({country,rate})=>{
    setRate({...rate,rate:rate,currency:country,user_token: localStorage.getItem('auth_token')})
    });

  },[data])
  useEffect(()=>{
    const getCurrency = () => {
      const data = {
        currency:rate.currency,
      }
      axios.post('/api/money/rate/get',data).then((res)=>{
        setLoading({ ...loading, isLoading: false });
  
        if(res.data.status == 200){
          setData(res.data.rates);
  
        }else{
          swal('Warning',res.data.message,'warning');
        }
      });
    }
    getCurrency();
  },[]);
  const rateSubmit = (e) => {
    e.preventDefault();
    setLoading({ ...loading, isLoading: true });

    const data = {
      rate: rate.rate,
      currency: rate.currency,
      user_token: rate.user_token
    }
    axios.post('/api/money/rate/add',data).then((res)=>{
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
         <Header />
      <div className="dashboard">
        <Sidebar/>
        <div className="dashboard_body">
        <div className='header_dash'>
        <h2>Money Stats</h2>
      </div>
      <div className='money_stats'>
        <div className='grid'>
        <div className='money_stat'>
          <h3>Congradulations $12 has been deposited into your account... </h3>
          <span><Timeline/>2022/12/12 9:00</span>
        </div>
        <div className='rates'>
         <div className='header z-index-low' style={{marginBottom:"20px"}}>
          Rates
         </div>
         <div className='rates_body'>
         <form onSubmit={rateSubmit}>
          <div className='grid'>
          <input type="text" onChange={rateHandler} value={rate.rate} className='input' placeholder='enter your rate' name="rate" />
          <select  onChange={rateHandler} value={rate.currency} className='rate_options input' name="currency">
           <option value="rtgs">rtgs</option>
           <option value="zar">zar</option>
           <option value="canadian">canadian $</option>
          </select>
          </div>
          <button type='submit' className='button app-btn schedule-sent'>Change Rate</button>
         </form>
         </div>
        </div>
        </div>
      </div>
        </div>
      </div>
    </div>
    </ContextProvider>
  )
}
