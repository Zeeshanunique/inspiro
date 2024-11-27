import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

function AiOutputDialog({ openDialog, closeDialog, orgImage, aiImage }) {
  const handleClose = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    closeDialog();
  };

  return (
    <AlertDialog open={openDialog} onOpenChange={closeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Result:</AlertDialogTitle>
        </AlertDialogHeader>
        <div onClick={(e) => e.stopPropagation()}>
          <ReactBeforeSliderComponent
            firstImage={{
              imageUrl: aiImage,
            }}
            secondImage={{
              imageUrl: orgImage,
            }}
          />
          <div className="flex justify-center mt-6 mb-4">
            <Button 
              onClick={handleClose}
              className="
                px-8 
                py-3 
                bg-gradient-to-r 
                from-purple-600 
                to-indigo-600 
                hover:from-purple-700 
                hover:to-indigo-700 
                text-white 
                font-medium 
                rounded-full 
                transform 
                hover:scale-105 
                transition-all 
                duration-200 
                flex 
                items-center 
                gap-2 
                shadow-lg 
                hover:shadow-xl"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
              Close
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AiOutputDialog;
