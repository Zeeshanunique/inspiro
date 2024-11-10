"use client"; // Add this at the top to mark as client component

import { Button } from "@/components/ui/button";
import { ArrowRight, Wand2, Sparkles, Clock, CreditCard } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      icon: <Wand2 className="w-10 h-10 text-purple-500" />,
      title: "AI-Powered Transformations",
      description: "Transform any room with our advanced AI technology that understands your style and preferences."
    },
    {
      icon: <Sparkles className="w-10 h-10 text-purple-500" />,
      title: "Stunning Results",
      description: "Get professional-quality room designs that look realistic and match your vision perfectly."
    },
    {
      icon: <Clock className="w-10 h-10 text-purple-500" />,
      title: "Quick & Easy",
      description: "Generate beautiful room designs in seconds, not hours. No design experience needed."
    },
    {
      icon: <CreditCard className="w-10 h-10 text-purple-500" />,
      title: "Flexible Credits",
      description: "Pay only for what you need with our credit-based system. No subscriptions required."
    }
  ];

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/api/placeholder/1920/600"
            alt="Room Design Background"
            className="object-cover w-full h-full brightness-50"
          />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transform Your Space with AI Magic
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Design your dream room in seconds using our advanced AI technology.
            Upload a photo and watch the magic happen.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => handleNavigation('/dashboard')}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => handleNavigation('/dashboard')}
            >
              View Gallery
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose AI Room Design?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload Your Room",
                description: "Take a photo of your room and upload it to our platform."
              },
              {
                step: "2",
                title: "Choose Your Style",
                description: "Select from various design styles or describe your perfect room."
              },
              {
                step: "3",
                title: "Get Results",
                description: "Receive multiple AI-generated designs of your transformed space."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of happy customers who have redesigned their rooms with AI.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={() => handleNavigation('/dashboard')}
          >
            Start Designing Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}