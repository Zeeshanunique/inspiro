import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

function AiOutputDialog({ openDialog, closeDialog, orgImage, aiImage }) {
  return (
    <AlertDialog open={openDialog}>
      <AlertDialogTrigger />
      <AlertDialogContent  onEscapeKeyDown={closeDialog} onPointerDownOutside={closeDialog}>
        <AlertDialogHeader>
          <AlertDialogTitle>Result:</AlertDialogTitle>
        </AlertDialogHeader>
        <ReactBeforeSliderComponent
          firstImage={{
            imageUrl: aiImage,
          }}
          secondImage={{
            imageUrl: orgImage,
          }}
        />
        <Button onClick={closeDialog} className="mt-4">
          Close
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AiOutputDialog;
