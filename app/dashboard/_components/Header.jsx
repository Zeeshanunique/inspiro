"use client";
import Image from "next/image";
import React,{useContext} from "react";
import {UserButton} from "@clerk/clerk-react";
import UserDetailContext from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import BuyCredits from "../buy-credits/page";

function Header() {
    const {userDetail} = useContext(UserDetailContext);
  return (
    <div className="p-5 shadow-sm flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Image alt="" src={"/logo.svg"} width={40} height={40} />
        <h2 className="font-bold text-lg">AI Room Design</h2>
      </div>

      <Button variant="ghost" className="rounded-full text-primary" onClick={BuyCredits}>Buy More Credits</Button>
      <div className="flex gap-7 items-center" >
        <div className="flex gap-2 p-1 items-center bg-slate-200 px-3 rounded-full">
            <Image alt='' src={'/star.png'} width={20} height={20}/>
            <h2>{userDetail?.credits}</h2>
        </div>
        <UserButton/>
      </div>
    </div>
  );
}

export default Header;
