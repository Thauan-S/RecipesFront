
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const DashBoard = () => {
    const[recipes,SetRecipes]=useState()
    const [error,setError]=useState("")
  const  baseUrl=import.meta.env.VITE_BASE_URL;
    useEffect(()=>{
        console.log(baseUrl)
 axios.get(baseUrl+"/dashboard",{ withCredentials: true }) .then((response)=> SetRecipes(response.data))
 .catch((error)=>setError(error.message)

)       
    },[baseUrl])
  return (
   <div>bem vindo ao dashboard</div>
  )
}

export default DashBoard