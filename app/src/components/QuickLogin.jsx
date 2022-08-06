import React from "react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useUserContext } from "../provider/ContextProvider";

export default function QuickLogin() {
  const navigate = useNavigate();
  const {handleLogin} = useUserContext();
  
  useEffect(function() {
    handleLogin("atrasshalhan@gmail.com", "testing12345");
    return navigate("/");
  }, []);
  
  return <div>Quick Login</div>;
}
