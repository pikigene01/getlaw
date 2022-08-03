import React from 'react'
import Home from './home'
import { ContextProvider } from '../lawfirms/HomeContext';


export default  function 
WholeApp() {
  return (
    <>
<ContextProvider>

<Home/>
</ContextProvider>
    </>
  )
}
