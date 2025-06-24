import React from 'react';
import { ChefHat, Heart, Users, Award } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-700 transition-colors duration-200"
            >
              <ChefHat className="h-8 w-8 text-red-700" />
              <h1 className="text-2xl font-bold text-gray-900">Ayush's Kitchen</h1>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">About Ayush's Kitchen</h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Welcome to a culinary journey through the rich and diverse flavors of Indian cuisine. 
            Our mission is to bring authentic, time-tested recipes to your kitchen with modern convenience.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
          <div className="prose prose-lg text-gray-700 leading-relaxed">
            <p className="mb-4">
              Ayush's Kitchen was born from a passion for preserving and sharing the authentic flavors 
              of Indian cuisine. Growing up in a family where cooking was an art form passed down through 
              generations, I learned that food is more than just sustenance—it's a way to connect with 
              our heritage and bring people together.
            </p>
            <p className="mb-4">
              Each recipe in our collection has been carefully tested and refined to ensure that you can 
              recreate the same authentic flavors in your own kitchen, regardless of your cooking experience. 
              From the bustling streets of Mumbai to the royal kitchens of Rajasthan, we bring you recipes 
              that tell the story of India's rich culinary heritage.
            </p>
            <p>
              Whether you're a seasoned cook or just starting your culinary journey, our detailed 
              instructions, helpful tips, and authentic ingredients list will guide you every step of the way.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="h-8 w-8 text-red-700" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Authenticity</h4>
            <p className="text-gray-600">Traditional recipes passed down through generations</p>
          </div>
          
          <div className="text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-amber-700" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Passion</h4>
            <p className="text-gray-600">Cooked with love and shared with joy</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-700" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Community</h4>
            <p className="text-gray-600">Bringing families and friends together through food</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-purple-700" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Quality</h4>
            <p className="text-gray-600">Every recipe tested and perfected for the best results</p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-red-700 to-red-800 rounded-2xl text-white p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
          <p className="text-xl leading-relaxed max-w-2xl mx-auto">
            To make authentic Indian cooking accessible to everyone, preserving traditional flavors 
            while adapting to modern kitchens and lifestyles. We believe that great food has the 
            power to create memories, strengthen bonds, and celebrate our rich cultural heritage.
          </p>
        </div>
      </div>
    </div>
  );
};