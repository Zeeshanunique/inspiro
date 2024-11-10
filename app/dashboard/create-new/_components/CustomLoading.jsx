import React from "react";
import Image from "next/image";
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <VisuallyHidden>
          <AlertDialogTitle>Loading</AlertDialogTitle>
        </VisuallyHidden>
        <div className="bg-white flex flex-col items-center my-10 justify-center">
          <Image src="/loading.gif" alt="loading" width={100} height={100} />
          <h2>Redesigning your room ... Do not Refresh</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
