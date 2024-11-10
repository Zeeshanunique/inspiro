"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ImageSelection from "./_components/ImageSelection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AdditionalReq from "./_components/AdditionalRequirement";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { useUser } from "@clerk/nextjs";
import CustomLoading from "./_components/CustomLoading";
import AiOutputDialog from "../_components/AiOutputDialog";


function CreateNew() {
  const router = useRouter();
  const { user } = useUser();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [aiOutputImage, setAiOutputImage] = useState("");
  const [openOutputDialog, setOpenOutputDialog] = useState(false);
  const [orgImage, setOrgImage] = useState();

  const onHandleInputChange = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    console.log({ ...formData, [fieldName]: value });
  };

  const GenerateAiImage = async () => {
    try {
      setLoading(true);
      const rawImageUrl = await SaveRawImageToFirebase();
      const result = await axios.post("/api/redesign-room", {
        imageUrl: rawImageUrl,
        roomType: formData?.roomType,
        designType: formData?.designType,
        additionalReq: formData?.additionalReq,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });

      console.log(result);
      setAiOutputImage(result.data.result);
      setOpenOutputDialog(true);
    } catch (error) {
      console.error("Error generating AI image:", error);
    } finally {
      setLoading(false);
    }
  };

  const SaveRawImageToFirebase = async () => {
    if (!formData.image) throw new Error("No image selected");

    const fileName = `${Date.now()}_raw.png`;
    const imageRef = ref(storage, "room-redesign/" + fileName);

    await uploadBytes(imageRef, formData.image).then(() => {
      console.log("Image uploaded successfully");
    });

    const downloadUrl = await getDownloadURL(imageRef);
    console.log(downloadUrl);
    setOrgImage(downloadUrl);
    return downloadUrl;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="outline"
          onClick={() => router.push('/dashboard')}
          className="mb-4"
        >
          Back to Dashboard
        </Button>
      </div>
      
      <h2 className="font-bold text-4xl text-primary text-center">
        Experience the Magic of AI Remodeling
      </h2>
      <p className="text-center text-gray-500">
        Transform any room with a click. Select a space, choose a style, and watch as AI instantly reimagines your environment.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        <ImageSelection selectedImage={(value) => onHandleInputChange(value, "image")} />
        <div>
          <RoomType selectedRoomType={(value) => onHandleInputChange(value, "roomType")} />
          <DesignType selectedDesignType={(value) => onHandleInputChange(value, "designType")} />
          <AdditionalReq additionalRequirementInput={(value) => onHandleInputChange(value, "additionalReq")} />
          <Button className="w-full mt-5" onClick={GenerateAiImage}>
            Generate
          </Button>
          <p className="text-sm text-gray-400 mb-52">
            NOTE: 1 Credit will be used to redesign your room
          </p>
        </div>
      </div>
      <CustomLoading loading={loading} />
      <AiOutputDialog 
        openDialog={openOutputDialog} 
        closeDialog={() => setOpenOutputDialog(false)}
        orgImage={orgImage}
        aiImage={aiOutputImage}
      />
    </div>
  );
}

export default CreateNew;