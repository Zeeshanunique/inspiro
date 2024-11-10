"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";

function BuyCredits() {
  const creditsOptions = [
    { credits: 5, amount: 0.99 },
    { credits: 10, amount: 1.99 },
    { credits: 25, amount: 3.99 },
    { credits: 50, amount: 6.99 },
    { credits: 100, amount: 9.99 },
  ];

  const [selectedOption, setSelectedOption] = useState([]);

  const onPaymentSuccess = async () => {
    console.log("Payment Success");
    try {
      const response = await fetch("/api/update-credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credits: selectedOption.credits }),
      });

      if (response.ok) {
        alert("Credits successfully purchased!");
      } else {
        throw new Error("Failed to update credits");
      }
    } catch (error) {
      console.error(error);
      alert("There was an error processing your purchase. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="font-bold text-3xl text-center mb-2">Buy More Credits</h2>
      <p className="text-gray-600 text-center mb-8">
        Unlock endless possibilities – Buy more credits and transform your room
        with AI magic! ✨🛋️
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {creditsOptions.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedOption(item)}
            className={`p-6 border rounded-lg flex flex-col items-center cursor-pointer transition 
                          ${
                            selectedOption?.credits === item.credits
                              ? "border-purple-500 shadow-xl"
                              : "border-gray-200 shadow-lg hover:shadow-xl hover:border-purple-400"
                          }
                        `}
          >
            <h3 className="font-bold text-2xl mb-1">{item.credits}</h3>
            <p className="text-gray-600 mb-4">Credits</p>
            <Button
              className={`w-full py-2 mb-4 ${
                selectedOption?.credits === item.credits
                  ? "bg-purple-500 text-white"
                  : "bg-purple-100 text-purple-500"
              }`}
            >
              {selectedOption?.credits === item.credits ? "Selected" : "Select"}
            </Button>
            <p className="text-gray-800 font-semibold">
              ${item.amount.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        {selectedOption?.amount && (
          <PayPalButtons
            style={{ layout: "horizontal" }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(() => {
                onPaymentSuccess();
              });
            }}
            onCancel={() => console.log("Payment Cancelled")}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: selectedOption.amount.toFixed(2),
                      currency_code: "USD",
                    },
                  },
                ],
              });
            }}
          />
        )}
      </div>
    </div>
  );
}

export default BuyCredits;
