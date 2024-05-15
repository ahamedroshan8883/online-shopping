import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Logout({setUsername}){
  const navigate = useNavigate();
    useEffect(()=>{
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('email')
        setUsername('');
        navigate('/')
    })
  return (<>
    
  </>)
};