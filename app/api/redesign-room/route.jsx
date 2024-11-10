import axios from "axios";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { db } from "@/config/db";
import { AiGeneratedImages } from "@/config/schema";
import { useUser } from "@clerk/nextjs";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function POST(req) {
  const { imageUrl, roomType, designType, additionalReq, userEmail } = await req.json();

  try {
    const input = {
      image: imageUrl,
      prompt: `A ${roomType} with a ${designType} style interior ${additionalReq}`,
    };

    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );

    console.log("Replicate Output:", output);

    const base64Image = await ConvertImageToBase64(output);

    const fileName = `${Date.now()}.png`;
    const storageRef = ref(storage, `room-redesign/${fileName}`);
    await uploadString(storageRef, base64Image, "data_url");

    const downloadUrl = await getDownloadURL(storageRef);
    console.log("Firebase Download URL:", downloadUrl);

    const dbResult = await db
      .insert(AiGeneratedImages)
      .values({
        roomType,
        designType,
        orgImageUrl: imageUrl,
        aiImage: downloadUrl,
        userEmail,
      })
      .returning({ id: AiGeneratedImages.id });

    console.log("Database Insertion Result:", dbResult);

    return NextResponse.json({ result: downloadUrl });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ error: e.message || "An error occurred" });
  }
}

async function ConvertImageToBase64(imageUrl) {
  const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const base64ImageRaw = Buffer.from(resp.data, "binary").toString("base64");
  return `data:image/png;base64,${base64ImageRaw}`;
}
