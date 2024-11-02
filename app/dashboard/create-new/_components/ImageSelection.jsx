"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

function ImageSelection({selectedImage}) {
  const [file, setFile] = useState();
  
  const onFileSelected = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    selectedImage(event.target.files[0]);
  };

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file);
      }
    };
  }, [file]);

  return (
    <div>
      <label>Select Image of your room</label>
      <div className="mt-3">
        <label htmlFor="upload-image">
          <div
            className={`border rounded-xl flex justify-center items-center border-primary bg-slate-200 cursor-pointer hover:shadow-lg
              ${file ? 'bg-white p-0' : 'p-28'}
            `}
          >
            {!file ? (
              <Image src={"/uploadimage.png"} alt="" width={70} height={70} />
            ) : (
              <Image
                src={URL.createObjectURL(file)}
                alt=""
                width={300}
                height={300}
                className="w-[300px] h-[300px] object-cover"
              />
            )}
          </div>
        </label>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: "none" }}
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
}

export default ImageSelection;
