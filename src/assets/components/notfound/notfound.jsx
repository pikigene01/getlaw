import React from 'react'
import Header from '../header/header'
import './Notfound.css'

export default function Notfound() {
  document.title = "Page You are looking for was not found | GetLaw";

  return (
    <div>
        <Header/>
        <br/>
        <h1>Page you are looking for  was not found...</h1>
    </div>
  )
}
