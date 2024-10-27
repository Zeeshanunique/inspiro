"use client"
import axios from "axios";
import {useUser} from '@clerk/nextjs'
import React, { useEffect } from "react";

function Provider({ children }) {

const { user } = useUser();

useEffect(() => {
    user && VerifyUser();
}, [user]);
  

const VerifyUser =async () => {
    const dataResult = await axios.post("/api/verify-user", { 
        user: user
     });
     console.log(dataResult.data);
    };
  return <div>{children}</div>;
}

export default Provider;
