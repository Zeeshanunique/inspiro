"use client";
import React, { useState } from "react";
import ImageSelection from "./_components/ImageSelection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AdditionalReq from "./_components/AdditionalRequirement";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig"; 

function CreateNew() {
  // Initialize formData as an object instead of an array
  const [formData, setFormData] = useState({});

  const onHandleInputChange = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    console.log({ ...formData, [fieldName]: value }); // Log updated formData
  };

  const GenerateAiImage= async ()=>{
    const rawImageUrl=await SaveRawImageToFirebase();
    const result = await axios.post("/api/redesign-room",{
      imageUrl:rawImageUrl,
      roomType:formData?.roomType,
      designType:formData?.designType,
      additionalReq:formData?.additionalReq
    });
    console.log(result);
  }
  const SaveRawImageToFirebase= async()=>{
    // Save image to firebase
    const fileName=Date.now()+'_raw.png';
    const imageRef = ref(storage, 'room-redsign/'+fileName);

    await uploadBytes(imageRef, formData.image).then(resp=>{
      console.log('Image uploaded successfully');
    })
    //uploaded image url
    const downloadUrl = await getDownloadURL(imageRef);
    console.log(downloadUrl);
    return downloadUrl;
  }
  return (
    <div>
      <h2 className="font-bold text-4xl text-primary text-center">
        Experience the Magic of AI Remodeling
      </h2>
      <p className="text-center text-gray-500">
        Transform any room with a click. Select a space, choose a style, and
        watch as AI instantly reimagines your environment.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        {/* Image Section */}
        <ImageSelection selectedImage={(value) => onHandleInputChange(value, "image")} />

        {/* Form Input Section */}
        <div>
          {/* Room type */}
          <RoomType selectedRoomType={(value) => onHandleInputChange(value, "roomType")} />

          {/* Design Type */}
          <DesignType selectedDesignType={(value) => onHandleInputChange(value, "designType")} />

          {/* Additional Requirement TextArea (Optional) */}
          <AdditionalReq additionalRequirementInput={(value) => onHandleInputChange(value, "additionalReq")} />

          {/* Button to Generate Image */}
          <Button className="w-full mt-5" onClick={GenerateAiImage}>Generate</Button>
          <p className="text-sm text-gray-400 mb-52">
            NOTE: 1 Credit will be used to redesign your room
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateNew;
