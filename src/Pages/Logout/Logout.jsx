import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Logout({setUsername}){
  const navigate = useNavigate();
  const handleConfirmation = ()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('email')
        setUsername('');
        navigate('/')
        Swal.fire({
          title: "Log out!",
          text: "Your account has been logout.",
          icon: "success"
        });
      }else{
        navigate('/');
      }
    });
  }
    useEffect(()=>{
      handleConfirmation();
    })
  return (<>
    
  </>)
};