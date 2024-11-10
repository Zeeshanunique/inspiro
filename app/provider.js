"use client";
// import axios from "axios";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import UserDetailContext from "./_context/UserDetailContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState([]);

  useEffect(() => {
    if (user) {
      GetUserRoomList();
    }
  }, [user]);
  
  // const VerifyUser = async () => {
  //   const dataResult = await axios.post("/api/verify-user", {
  //     user: user,
  //   });
  //   setUserDetail(dataResult.data.result);
  // };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <PayPalScriptProvider
        options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
      >
        <div>{children}</div>
      </PayPalScriptProvider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
